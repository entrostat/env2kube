import { Command, flags } from '@oclif/command';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { promises as fs } from 'fs';

class Env2Kube extends Command {
    static description = `Convert a .env file to a Kubernetes secret yaml file.

        All of the values are base64 encoded and the secret can be used in the envFrom option on your deployments. The name of the yaml file defaults to the same as the environment file without the "dot" in front.`;

    static examples = [
        `env2kube .env --name=appsecrets`,
        `env2kube .env --output=./secrets/env.yaml --name=appsecrets`,
        `env2kube .env --namespace=myapp --name=appsecrets`,
    ];

    static flags = {
        output: flags.string({
            char: 'o',
            description: 'The output file path and name',
            required: false,
        }),
        namespace: flags.string({
            char: 'N',
            description: 'The namespace the secret should be applied under',
            default: 'default',
        }),
        name: flags.string({
            char: 'n',
            description: 'The name of the secret',
            required: true,
        }),
    };

    static args = [
        {
            name: 'env_file',
            required: true,
            description:
                'The name of the environment file that you would like to convert.',
        },
    ];

    async run() {
        const { args, flags } = this.parse(Env2Kube);
        const outputFileName = this.getOutputName(args.env_file, flags.output);
        this.log(`Converting ${args.env_file} to ${outputFileName}`);

        const env = await this.parseEnvFile(args.env_file);
        const yaml = this.generateYaml(env, flags.name, flags.namespace);
        await fs.writeFile(outputFileName, yaml);
    }

    /**
     * TODO: Look at pulling this out into a Handlebars template
     * @param env The parsed environment
     * @param name The name of the secret
     * @param namespace The namespace that the secret should be stored in
     * @private
     */
    private generateYaml(env: any, name: string, namespace: string) {
        return `apiVersion: v1
kind: Secret
metadata:
${this.generateMetadata(name, namespace)}
type: Opaque
data:
${this.generateData(env)}
`;
    }

    private generateMetadata(name: string, namespace: string) {
        return `  name: ${name}
  namespace: ${namespace}`;
    }

    private generateData(env: any) {
        return Object.keys(env)
            .filter((key) => env[key])
            .map(
                (key) =>
                    `  ${key}: ${Buffer.from(env[key]).toString('base64')}`,
            )
            .join('\n');
    }

    private async parseEnvFile(envFileArg: string) {
        const envPath = path.resolve(envFileArg);
        this.log(`Parsing ${envPath}`);
        const env = dotenv.parse(
            await fs.readFile(envPath).then((d) => d.toString()),
        );

        this.log(`Parsed ${Object.keys(env).length} variables`);
        Object.keys(env)
            .sort()
            .filter((key) => env[key])
            .forEach((key) => this.log(`    - ${key}`));
        return env;
    }

    /**
     * Takes the output name specified by the user or defaults it to the name
     * of the env file with .yaml at the end and without the "dot" at the front
     * if there is one
     * @param envFileName The name of the environment file
     * @param outputName The name of the file specified by the user
     * @private
     */
    private getOutputName(envFileName: string, outputName?: string) {
        if (outputName) {
            return outputName;
        }
        return `${envFileName.replace(/^\./, '')}.yaml`;
    }
}

export = Env2Kube;
