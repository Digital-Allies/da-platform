'use client'

import Script from 'next/script'

// Bump when Meta deprecates the current Graph API version.
const FB_SDK_VERSION = 'v21.0'

export default function FacebookSdk({ appId }: { appId: string }) {
  if (!appId) return null

  return (
    <>
      <div id="fb-root" />
      <Script id="facebook-jssdk-init" strategy="afterInteractive">
        {`
          window.fbAsyncInit = function() {
            FB.init({
              appId: '${appId}',
              cookie: true,
              xfbml: true,
              version: '${FB_SDK_VERSION}'
            });
            FB.AppEvents.logPageView();
          };
        `}
      </Script>
      <Script
        id="facebook-jssdk"
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
      />
    </>
  )
}
