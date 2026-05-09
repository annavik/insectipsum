import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CopyIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const TYPES = [
  { label: "Paragraphs", value: "paragraphs" },
  { label: "Sentences", value: "sentences" },
  { label: "Words", value: "words" },
]

export const InsectIpsum = () => {
  const [count, setCount] = useState(3)
  const [type, setType] = useState("paragraphs")

  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl font-medium text-primary dark:text-foreground">
        Insect Ipsum
      </h1>
      <div className="mb-8 flex items-end gap-4">
        <Input
          className="w-24"
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.currentTarget.value))}
        />
        <Select value={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Generate</Button>
      </div>
      <div className="relative space-y-4 rounded-lg border bg-muted p-12 font-serif">
        <Button
          aria-label="Copy"
          className="absolute top-2 right-2"
          variant="outline"
          size="icon"
        >
          <CopyIcon />
        </Button>
        <p>
          Apis mellifera bombyx mori drosophila melanogaster formica rufa.
          Mantis religiosa lucanus cervus lampyris noctiluca periplaneta
          americana. Gryllus campestris vanessa atalanta papilio machaon sphinx
          ligustri. Vespa crabro libellula depressa carabus coriaceus blatta
          orientalis.
        </p>
        <p>
          Coccinella septempunctata anax imperator necrophorus vespillo
          dermestes lardarius. Panorpa communis tipula oleracea sialis lutaria
          ephemera danica. Cimex lectularius forficula auricularia dytiscus
          marginalis aeshna cyanea. Melolontha melolontha acheta domesticus
          hydrophilus piceus geotrupes stercorarius.
        </p>
        <p>
          Chrysis ignita philanthus triangulum bombus terrestris andrena fulva.
          Deilephila elpenor saturnia pavonia zygaena filipendulae xylocopa
          violacea. Oryctes nasicornis cerambyx cerdo pyrrhocoris apterus
          cantharis rustica. Pentatoma rufipes leptophyes punctatissima
          conocephalus fuscus tetrix subulata.
        </p>
      </div>
    </div>
  )
}
