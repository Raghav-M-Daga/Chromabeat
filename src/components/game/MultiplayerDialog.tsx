import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog"

export default function MultiplayerDialog({ multiplayerOpen, setMultiplayerOpen, partyCode }: { multiplayerOpen: boolean; setMultiplayerOpen: React.Dispatch<React.SetStateAction<boolean>>; partyCode: string }) {
    return (
        <Dialog open={multiplayerOpen} onOpenChange={setMultiplayerOpen}>
            <DialogTitle>
                dfd
            </DialogTitle>
            <DialogContent className="sm:max-w-md bg-black border-white/20" showCloseButton={false}>
                <div className="flex justify-center items-center h-32">
                    <span className="text-5xl font-mono tracking-widest text-white">{partyCode}</span>
                </div>
            </DialogContent>
        </Dialog>
    )
}