# XM Cloud Starter Kit (Next JS)

This solution is a fork of the official xmcloud foundation head starter kit. It's intended purpose is to showcase how you can get started on working with SXA content replacement tokens in a xm cloud solution.

Because making changes to the platform is an absolute no-go this solution focuses on getting the work done on the Nextjs side of things.

There's 3 files of interest which make this solution work:
`src\sxastarter\src\lib\functions\replacecontent.ts`
`src\sxastarter\src\lib\functions\sitecore-type-check.ts`
`src\sxastarter\src\lib\page-props-factory\plugins\content-replace.ts`

The page-props-factory plugin is what makes it all come together.

This solution assumes You're placing the content tokens inside the dictionary of your site and that you utilize the tokens as follows: `$(tokenName)`.
If no token is present inside the dictionary it will just render `$(tokenName)` as expected.
