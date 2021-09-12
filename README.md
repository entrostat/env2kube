env2kube
========

Convert a .env file to a Kubernetes secret yaml file so that you can apply it and use it in your deployments.

You're able to specify the name and namespace for the secret and the output file name if you'd like on that isn't the same as the env file without `.yaml` at the end.

It's weird, I did search for similar libraries but didn't find any until now. If you're looking for an alternative, here's a link to a previously existing one [https://www.npmjs.com/package/env2kube](https://www.npmjs.com/package/env2kube).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/env2kube.svg)](https://npmjs.org/package/@entrostat/env2kube)
[![Downloads/week](https://img.shields.io/npm/dw/env2kube.svg)](https://npmjs.org/package/@entrostat/env2kube)
[![License](https://img.shields.io/npm/l/env2kube.svg)](https://github.com/entrostat/env2kube/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @entrostat/env2kube
$ env2kube COMMAND
running command...
$ env2kube (-v|--version|version)
@entrostat/env2kube/1.0.6 linux-x64 node-v14.17.3
$ env2kube --help [COMMAND]
USAGE
  $ env2kube COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
