env2kube
========

Convert a .env file to a Kubernetes secret yaml file so that you can apply it and use it in your deployments.

You're able to specify the name and namespace for the secret and the output file name if you'd like on that isn't the same as the env file without `.yaml` at the end.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/env2kube.svg)](https://npmjs.org/package/env2kube)
[![Downloads/week](https://img.shields.io/npm/dw/env2kube.svg)](https://npmjs.org/package/env2kube)
[![License](https://img.shields.io/npm/l/env2kube.svg)](https://github.com/entrostat/env2kube/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g env2kube
$ env2kube COMMAND
running command...
$ env2kube (-v|--version|version)
env2kube/0.0.0 linux-x64 node-v14.17.3
$ env2kube --help [COMMAND]
USAGE
  $ env2kube COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
