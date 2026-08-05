import React, { useState } from "react";
import { CheckCircle2, XCircle, Award, ArrowRight, X } from "lucide-react";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";

interface LessonModalProps {
  nodeId: string;
  onClose: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ nodeId, onClose }) => {
  const { completeNode } = useSkillTreeStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const options = [
    { id: 0, text: "Praca wielozadaniowa (multitasking) z włączonym powiadomieniami.", correct: false },
    { id: 1, text: "Eliminacja rozpraszaczy i pełne skupienie na jednym zadaniu przez wyznaczony czas.", correct: true },
    { id: 2, text: "Przeglądanie mediów społecznościowych w przerwach co 3 minuty.", correct: false },
  ];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    const correct = options[index].correct;
    setIsCorrect(correct);
  };

  const handleFinish = () => {
    completeNode(nodeId);
    setIsFinished(true);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="w-[520px] bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-5 relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-full text-slate-400 hover:text-white cursor-pointer transition-all"
        >
          <X size={18} />
        </button>

        {/* Header & Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pr-8">
            <span className="text-xs font-pixel text-emerald-400 font-bold uppercase tracking-wider">
              {nodeId ? `Lekcja: Poziom ${nodeId.replace('node_', '')}` : "Lekcja Skupienia"}
            </span>
            <span className="text-xs font-pixel text-slate-400">+25 XP</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: isFinished ? "100%" : isAnswered && isCorrect ? "70%" : "30%" }}
            />
          </div>
        </div>

        {/* Lesson Content Body */}
        {!isFinished ? (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <h3 className="text-lg font-pixel font-bold text-white leading-snug">
                Pytanie 1 z 1
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Jaka jest kluczowa zasada techniki Głębokiej Pracy (Deep Work)?
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-2">
              {options.map((opt, idx) => {
                let btnStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500";
                if (isAnswered) {
                  if (opt.correct) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                  } else {
                    btnStyle = "bg-slate-900 border-slate-800 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 border-2 rounded-2xl text-left text-xs font-pixel font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-950 border border-white/20 flex items-center justify-center text-[10px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Result Banner */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between animate-fade-in ${
                  isCorrect
                    ? "bg-emerald-950/90 border-emerald-500 text-emerald-300"
                    : "bg-rose-950/90 border-rose-500 text-rose-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle size={24} className="text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-pixel text-xs font-bold">
                      {isCorrect ? "Świetnie! Poprawna odpowiedź!" : "Spróbuj ponownie!"}
                    </h4>
                    <p className="text-[11px] opacity-90">
                      {isCorrect ? "+25 XP dodane do Twojego konta." : "Wybierz inną odpowiedź."}
                    </p>
                  </div>
                </div>

                {isCorrect && (
                  <button
                    onClick={handleFinish}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-pixel text-xs font-bold rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <span>DALEJ</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Victory Completion View */
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center text-amber-400 animate-bounce">
              <Award size={36} />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-pixel font-bold text-white">Lekcja Ukończona!</h3>
              <p className="text-xs font-pixel text-emerald-400 font-bold">+25 XP • Poziom Odblokowany</p>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-pixel text-xs font-bold rounded-2xl shadow-xl cursor-pointer active:scale-95 transition-all"
            >
              WRÓĆ DO DRZEWKA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
