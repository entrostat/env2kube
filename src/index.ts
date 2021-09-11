import { Command, flags } from '@oclif/command';

class Env2Kube extends Command {
    static description = `Convert a .env file to a Kubernetes secret yaml file.

        All of the values are base64 encoded and the secret can be used in the envFrom option on your deployments. The name of the yaml file defaults to the same as the environment file without the "dot" in front.`;

    static examples = [
        `env2kube .env`,
        `env2kube .env --output=./secrets/env.yaml`,
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
    }

    private getOutputName(envFileName: string, outputName?: string) {
        if (outputName) {
            return outputName;
        }
        return `${envFileName.replace(/^\./, '')}.yaml`;
    }
}

export = Env2Kube;
