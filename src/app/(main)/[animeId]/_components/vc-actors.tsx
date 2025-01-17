import { CharacterVoiceActor } from "@/types/anime";
import Image from "next/image";

export default function VCActors({
  characters,
}: {
  characters: CharacterVoiceActor[];
}) {
  if (!characters.length) return null;

  return (
    <div className="wrapper-container my-6 w-full space-y-7 px-4">
      <h3 className="text-2xl font-semibold text-secondary">
        Characters & Voice Actors
      </h3>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {characters.map(({ character, voiceActor }) => (
          <div
            key={character.id}
            aria-labelledby={character.name}
            aria-describedby={character.cast}
            className="rounded-xl bg-primary-100 px-2 py-3 sm:p-5"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={
                    character.poster
                      ? character.poster
                      : "/assets/images/placeholder.jpg"
                  }
                  alt={character.name + " character"}
                  height={44}
                  width={44}
                  className="aspect-square rounded-full object-cover"
                />
                <div className="space-y-1">
                  <h5 className="text-xs sm:text-[13px]">{character.name}</h5>
                  <p className="text-xs text-white/50">{character.cast}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="space-y-1 text-right">
                  <h5 className="text-xs sm:text-[13px]">{voiceActor.name}</h5>
                  <p className="text-xs text-white/50">{voiceActor.cast}</p>
                </div>
                <Image
                  src={
                    voiceActor.poster
                      ? voiceActor.poster
                      : "/assets/images/placeholder.jpg"
                  }
                  alt={voiceActor.name + " character"}
                  height={44}
                  width={44}
                  className="aspect-square rounded-full object-cover grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
