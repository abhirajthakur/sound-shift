import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="glass-card p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-6 gradient-text from-blue-400 to-purple-400">
            Terms of Service
          </h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Service Description
              </h2>
              <p>
                SoundShift provides a service that allows users to transfer
                their playlists between Spotify and YouTube Music platforms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. User Obligations
              </h2>
              <p>
                Users must comply with the terms of service of both Spotify and
                YouTube Music platforms when using SoundShift.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Data Usage</h2>
              <p>
                We only access the playlist data necessary for the transfer
                process and do not store any user data permanently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Service Limitations
              </h2>
              <p>
                SoundShift does not guarantee exact matches for all songs due to
                differences in music catalogs between platforms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
