"use client";

import { useRef, useState } from "react";

const SoundCheck = () => {
  const candidateSoundRef = useRef<HTMLAudioElement | null>(null);
  const otherSoundRef = useRef<HTMLAudioElement | null>(null);

  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [showFourthTable, setShowFourthTable] = useState(false);

  const toMarathi = (num: number) =>
    num
      .toString()
      .replace(/0/g, "०")
      .replace(/1/g, "१")
      .replace(/2/g, "२")
      .replace(/3/g, "३")
      .replace(/4/g, "४")
      .replace(/5/g, "५")
      .replace(/6/g, "६")
      .replace(/7/g, "७")
      .replace(/8/g, "८")
      .replace(/9/g, "९");

  const playSound = (
    index: number,
    isCandidate: boolean,
    triggerFourthTable = false
  ) => {
    const audio = isCandidate
      ? candidateSoundRef.current
      : otherSoundRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    setActiveRow(index);

    if (triggerFourthTable && isCandidate) {
      setShowFourthTable(true);
    }
  };

  const TableHeader = ({ title }: { title: string }) => (
    <thead>
      <tr className="bg-gray-100">
        <th className="border-2 border-gray-400 text-xs w-10">अनु. क्र.</th>
        <th className="border-2 border-gray-400 text-xs">{title}</th>
        <th className="border-2 border-gray-400 text-xs">फोटो</th>
        <th className="border-2 border-gray-400 text-xs">निशाणी</th>
        <th className="border-2 border-gray-400 text-xs">बत्ती</th>
        <th className="border-2 border-gray-400 text-xs">बटन</th>
      </tr>
    </thead>
  );

  const renderRow = (
    index: number,
    baseIndex: number,
    name: string,
    totalRows: number,
    bgColor: string,
    candidateIndex = 0,
    triggerFourthTable = false,
    imageSrc?: string
  ) => {
    const isCandidate = index === candidateIndex;
    const isNota = index === totalRows - 1;

    return (
      <tr key={index} className={bgColor}>
        <td className="border-2 border-gray-400 text-center font-bold text-xs">
          {toMarathi(index + 1)}
        </td>

        <td className="border-2 border-gray-400 text-center font-bold text-sm">
          {isCandidate ? name : isNota ? "नोटा (NOTA)" : ""}
        </td>

        <td className="border-2 border-gray-400 text-center">
          {isCandidate && imageSrc && (
            <img src={imageSrc} className="w-10 h-10 mx-auto" />
          )}
        </td>

        <td className="border-2 border-gray-400 text-center">
          {isCandidate && (
            <img src="/symbol-bartan.png" className="w-10 h-10 mx-auto" />
          )}
        </td>

        <td className="border-2 border-gray-400 text-center">
          <div
            className={`w-5 h-5 mx-auto rounded-full ${
              activeRow === baseIndex + index
                ? "bg-red-600"
                : "bg-gray-400"
            }`}
          />
        </td>

        <td className="border-2 border-gray-400 text-center">
          <button
            onClick={() =>
              playSound(
                baseIndex + index,
                isCandidate,
                triggerFourthTable
              )
            }
            className={`rounded-full w-12 h-6 ${
              isCandidate ? "bg-green-500" : "bg-blue-700"
            }`}
          />
        </td>
      </tr>
    );
  };

  return (
    <section className="bg-gray-100 px-4 py-6">

      <h1 className="text-center text-xl font-bold mb-4 pt-2">
        पुणे महानगरपालिका सार्वत्रिक निवडणूक - २०२६ डमी मतदान यंत्र
      </h1>


    <div className="text-center mb-4 pt-2">
<span className="bg-blue-700 font-bold text-white px-4 py-2 inline-block rounded-full">
डेमो मतदानासाठी कमळ या निशाणी समोरील बटन दाबावे
</span>
</div>

 <h1 className="text-center text-xl font-bold mb-4 pt-2">
        बाणेर-बालेवाडी-पाषाण-सोमेेश्वरवाडी-सुतारवाडी- सुस- महाळुंगे
      </h1>

      <div className="text-center mb-4 pt-2">
<span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded dark:bg-yellow-300">
प्रभाग क्रमांक ९ – भारतीय जनता पार्टीचे अधिकृत उमेदवार
</span>
</div>


      {/* TABLE 1 */}
      {!showFourthTable && (
        <table className="w-full border-2 border-gray-400 mt-4">
          <TableHeader title="प्रभाग क्र. ९ (अ) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(4)].map((_, i) =>
              renderRow(
                i,
                0,
                "चिमटे रोहिणी सुधीर",
                4,
                "bg-white",
                0,
                false,
                "/use1.png"
              )
            )}
          </tbody>
        </table>
      )}

      {/* TABLE 2 */}
      {!showFourthTable && (
        <table className="w-full border-2 border-gray-400 mt-6">
          <TableHeader title="प्रभाग क्र. ९ (ब) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(8)].map((_, i) =>
              renderRow(
                i,
                100,
                "कळमकर गणेश ज्ञानोबा",
                8,
                "bg-[#e8bbda]",
                0,
                false,
                "/use2.png"
              )
            )}
          </tbody>
        </table>
      )}

      {/* TABLE 3 */}
      {!showFourthTable && (
        <table className="w-full border-2 border-gray-400 mt-6">
          <TableHeader title="प्रभाग क्र. ९ (क) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(5)].map((_, i) =>
              renderRow(
                i,
                200,
                "कोकाटे मयुरी राहुल",
                5,
                "bg-[#fdfda5]",
                0,
                true,
                "/use3.png"
              )
            )}
          </tbody>
        </table>
      )}

      {/* TABLE 4 */}
      {showFourthTable && (
        <table className="w-full border-2 border-gray-400 mt-6">
          <TableHeader title="प्रभाग क्र. ९ (ड) उमेदवाराचे नाव" />
          <tbody>
            {[...Array(10)].map((_, i) =>
              renderRow(
                i,
                300,
                "बालवडकर लहू गजानन",
                10,
                "bg-[#9fdaeb]",
                3,
                false,
                "/use4.png"
              )
            )}
          </tbody>
        </table>
      )}


         {/* ================= FOOTER MESSAGE ================= */}   
   <h1 className="text-center text-xl font-bold mb-4 mt-6">
<span className="text-red-600">कमळ </span> या निशाणी समोरील बटन दाबून{" "}
<span className="text-red-600">भारतीय जनता पक्षाच्या .</span> 
चारही उमेदवारांना प्रचंड बहुमतांनी विजयी करा
</h1>

     <div className="text-center mb-4 pt-2">
<span className="bg-yellow-200 text-green-800 font-bold px-4 py-2 inline-block rounded">
मतदान - गुरुवार, दि. १५ जानेवारी २०२६ सकाळी ७:३० ते सायंकाळी ५.३० वाजेपर्यंत.
</span>
</div>

      {/* AUDIO */}
      <audio ref={candidateSoundRef} src="/sound1.mp3" />
      <audio ref={otherSoundRef} src="/sound2.mp3" />
    </section>
  );
};

export default SoundCheck;
