import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Data Collection</h2>
              <p>
                We only collect the data necessary to perform playlist
                transfers, including playlist names and song information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Data Usage</h2>
              <p>
                Your data is used solely for the purpose of transferring
                playlists between platforms and is not stored permanently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Third-Party Services
              </h2>
              <p>
                We use Spotify and YouTube Music APIs to access and transfer
                your playlist data. Please refer to their respective privacy
                policies for more information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p>
                We implement security measures to protect your data during the
                transfer process.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
