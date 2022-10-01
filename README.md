# Small script to update expo build version

## Overview

Expo uses app.json for general information. For versioning it uses **version** field in this file. This script allow you easily update this variable.

File **app.json** has structure like this:

```
{
    expo: {
        version
    }
}
```

## Usage

To update build version, run this command in root (folder with app.json file) of your project: `npm exec update-version`
