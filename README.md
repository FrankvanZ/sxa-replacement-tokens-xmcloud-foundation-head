# XM Cloud Starter Kit (Next JS)

This solution is a fork of the official [xmcloud foundation head starter kit](https://github.com/sitecorelabs/xmcloud-foundation-head). It's intended purpose is to showcase how you can get started on working with SXA content replacement tokens in a xm cloud solution.

Because making changes to the platform is an absolute no-go this solution focuses on getting the work done on the Nextjs side of things.

There's 3 files of interest which make this solution work:
`src\sxastarter\src\lib\functions\replacecontent.ts`
`src\sxastarter\src\lib\functions\sitecore-type-check.ts`
`src\sxastarter\src\lib\page-props-factory\plugins\content-replace.ts`

The page-props-factory plugin is what makes it all come together.

This solution assumes You're placing the content tokens inside the dictionary of your site and that you utilize the tokens as follows: `$(tokenName)`.
If no token is present inside the dictionary it will just render `$(tokenName)` as expected.

# Setup instructions

## QUICK START

1. In an ADMIN terminal:

   ```ps1
   .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
   ```

2. Restart your terminal and run:

   ```ps1
   .\up.ps1
   ```

3. create a basic site by scaffolding it from within your local CM instance
4. Create a dictionary folder to store your content replacement tokens inside the (newly) created site's Dictionary. Suggested Dictionary folder name = `Content Replacers`
5. Create Dictionary entries for content replacement tokens with keys in the form of $(contentReplacementToken).
6. utilize (newly) created replacement token from within a datasource and test if all works as expected.
