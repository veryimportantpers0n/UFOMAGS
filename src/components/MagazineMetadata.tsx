import { Magazine } from '@/types/magazine';

interface MagazineMetadataProps {
  magazine: Magazine;
}

/**
 * MagazineMetadata component - Displays magazine information
 * Requirements: 7.5, 7.6
 */
export default function MagazineMetadata({ magazine }: MagazineMetadataProps) {
  return (
    <section className="w-full bg-black/30 border border-[#00adb5]/20 rounded p-6 space-y-4" aria-label="Magazine Information">
      <div>
        <h2 className="text-2xl font-bold text-[#00adb5] mb-2">
          {magazine.coverName}
        </h2>
        <p className="text-gray-400 text-sm">
          <time dateTime={magazine.date}>{magazine.date}</time>
        </p>
      </div>

      {magazine.description && (
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
          <p className="text-gray-400 leading-relaxed">{magazine.description}</p>
        </div>
      )}

      {magazine.customText && (
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Additional Notes</h3>
          <p className="text-gray-400 leading-relaxed">{magazine.customText}</p>
        </div>
      )}
    </section>
  );
}
