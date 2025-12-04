import Link from 'next/link';
import Background from '@/components/Background';

export default function NotFound() {
  return (
    <Background type="static">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          {/* Lost in Space Message */}
          <h1 className="text-6xl md:text-8xl font-bold text-[#00ff41] mb-8 font-mono">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#00ff41] mb-6 font-mono">
            Lost in Space?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 font-mono">
            This page doesn&apos;t exist. Maybe it was abducted?
          </p>
          
          {/* Return to Homepage Button */}
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-black border-2 border-[#00ff41] text-[#00ff41] font-mono text-lg hover:bg-[#00ff41] hover:text-black transition-all duration-300 rounded"
          >
            Return to Homepage
          </Link>
          
          {/* ASCII Art Decoration */}
          <div className="mt-12 text-[#00ff41] font-mono text-sm opacity-50">
            <pre className="inline-block text-left">
{`    .  *  .  .   *   .  *
  *   .  *  .  *  .  .  *
.  *  .  UFO  .  *  .  *
  *  .  *  .  *  .  .  *
    .  *  .  .  *  .  *`}
            </pre>
          </div>
        </div>
      </div>
    </Background>
  );
}
