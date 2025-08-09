import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, LogIn, ArrowLeft, Check } from "lucide-react"
import { useState } from "react"

type ButtonColor = "yellow" | "blue" | "green" | "red"

export default function MultiplayerDialog({
  BUTTON_COLORS,
  BUTTON_ORDER,
  multiplayerOpen,
  setMultiplayerOpen,
  partyCode,
  onJoin
}: {
  BUTTON_COLORS: Record<ButtonColor, string>,
  BUTTON_ORDER: ButtonColor[],
  multiplayerOpen: boolean
  setMultiplayerOpen: React.Dispatch<React.SetStateAction<boolean>>
  partyCode: ButtonColor[]
  onJoin: (code: ButtonColor[]) => void
}) {
  const [inputCode, setInputCode] = useState<ButtonColor[]>([])

  const handleInput = (color: ButtonColor) => {
    if (inputCode.length < 5) setInputCode(prev => [...prev, color])
  }

  const handleDelete = () => {
    setInputCode(prev => prev.slice(0, -1))
  }

  const handleSubmit = () => {
    if (inputCode.length === 5) {
      onJoin(inputCode)
      setInputCode([])
    }
  }

  return (
    <Dialog open={multiplayerOpen} onOpenChange={setMultiplayerOpen}>
      <DialogTitle className="hiddens" />
      <DialogContent className="sm:max-w-md bg-black border-white/20 p-0" showCloseButton={false}>
        <Tabs defaultValue="host" className="w-full p-2">
          <TabsList className="grid w-full grid-cols-2 bg-black border-b border-white/20">
            <TabsTrigger value="host" className="text-white data-[state=active]:bg-white data-[state=active]:text-black transition-colors duration-300">
              <Crown className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="join" className="text-white data-[state=active]:bg-white data-[state=active]:text-black transition-colors duration-300">
              <LogIn className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          <div className="relative h-80 flex items-center justify-center">
            <TabsContent
              value="host"
              className="absolute inset-0 grid place-items-center transition-opacity duration-300 data-[state=active]:opacity-100 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:!block"
            >
              <div className="flex items-center justify-center gap-2">
                {partyCode.map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-none shadow-md"
                    style={{ backgroundColor: BUTTON_COLORS[color] }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="join"
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-300 data-[state=active]:opacity-100 data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none data-[state=inactive]:!block"
            >
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-none shadow-md"
                    style={{ backgroundColor: inputCode[i] ? BUTTON_COLORS[inputCode[i]] : "#333333" }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {BUTTON_ORDER.map(color => (
                  <button
                    key={color}
                    onClick={() => handleInput(color)}
                    className="w-20 h-20 rounded-none shadow-lg hover:scale-105 transition-transform hover:cursor-pointer"
                    style={{ backgroundColor: BUTTON_COLORS[color] }}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  disabled={inputCode.length === 0}
                  onClick={handleDelete}
                  className="p-3 bg-gray-800 disabled:opacity-50 hover:bg-gray-700 transition-colors hover:cursor-pointer"
                >
                  <ArrowLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  disabled={inputCode.length !== 5}
                  onClick={handleSubmit}
                  className="p-3 bg-gray-800 disabled:opacity-50 hover:bg-gray-700 transition-colors hover:cursor-pointer"
                >
                  <Check className="h-6 w-6 text-white" />
                </button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
