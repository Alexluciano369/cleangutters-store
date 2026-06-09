/* ═══════════════════════════════════════════════════
   Analytics Pixel — ~320 bytes gzipped
   Captures page_view, source, referrer, timestamp.
   POSTs to the Express server. Fire-and-forget.
   ═══════════════════════════════════════════════════ */
(function() {
  var u = new URL(location.href);
  var p = (window.RPURPOSE_API || 'https://underground-pixel-canal-economy.trycloudflare.com') + '/api/analytics/hit';
  if (typeof ANALYTICS_ENDPOINT !== 'undefined') p = ANALYTICS_ENDPOINT;
  try {
    var r = new XMLHttpRequest();
    r.open('POST', p, true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.send(JSON.stringify({
      event_type: 'page_view',
      source: u.searchParams.get('ref') || u.searchParams.get('utm_source') || '',
      referrer: document.referrer || '',
      page: u.pathname || '/',
      timestamp: new Date().toISOString()
    }));
  } catch (e) { /* silent — never break the page */ }
})();
