import { analyticsConfig, fbScript, gaScript, tiktokScript } from "@/lib/analytics";

export function AnalyticsScripts() {
  const { ga4, fb_pixel, tiktok } = analyticsConfig();
  return (
    <>
      {ga4 ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
          <script dangerouslySetInnerHTML={{ __html: gaScript(ga4) }} />
        </>
      ) : null}
      {fb_pixel ? <script dangerouslySetInnerHTML={{ __html: fbScript(fb_pixel) }} /> : null}
      {tiktok ? <script dangerouslySetInnerHTML={{ __html: tiktokScript(tiktok) }} /> : null}
    </>
  );
}
