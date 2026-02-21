/**
 * Next.js Instrumentation Hook
 * Runs ONCE at server startup — before any route handler, middleware, or module import.
 * This is the only reliable place to configure global Node.js settings like DNS servers.
 *
 * WHY DNS OVERRIDE HERE:
 * MongoDB's `mongodb+srv://` scheme triggers a DNS SRV record lookup via Node's `dns` module.
 * On Windows / mobile hotspots / restrictive ISPs, the OS default DNS refuses or drops SRV
 * queries over UDP port 53, producing `querySrv ECONNREFUSED`.
 * Google (8.8.8.8) and Cloudflare (1.1.1.1) handle SRV records correctly.
 * Setting this here guarantees the override is in place before MongoClient ever runs.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4", "1.0.0.1"]);
      console.log("[instrumentation] DNS servers set to Google + Cloudflare");
    } catch (err) {
      console.warn("[instrumentation] dns.setServers failed (non-fatal):", err);
    }
  }
}
