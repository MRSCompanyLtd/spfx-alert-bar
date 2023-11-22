# spfx-alert-bar

## Summary

Short summary on functionality and used technologies.

![alert bar image](/sharepoint/assets/alert-bar.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.4-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Create a list called Alerts on the site you want to deploy this extension on with these fields:
  - Title - this will be the field that shows in the top bar
  - Expires (Date and time) - this will be the field to determine if an alert should show

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| spfx-alert-bar | [MRS Company Ltd](https://mrscompany.com) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 22, 2023 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Clone repository and navigate to solution folder

```bash
git clone https://github.com/mrscompanyltd/spfx-alert-bar
cd spfx-alert-bar
```

Add dependencies

```bash
npm i
```

Serve (update /config/serve.json with your page URL)

```bash
gulp serve
```

Build and package

```bash
gulp build && gulp bundle --ship && gulp package-solution --ship # Builds, bundles, and creates sppkg file
```

Upload sppkg package from /sharepoint/solution/spfx-alert-bar.sppkg.

## Features

This application customizer reads alerts from a list (list should be called "Alerts" on the same site as the extension). Based on the "Expires" date for the alert, the application customizer will render each alert at the top of the page, cycling every 10 seconds. They can also be cycled manually.

Specifically, it uses the following features:  
- SPFx Application Customizer
- Page Placeholder (top)
- SPHttpClient and SharePoint List API

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
