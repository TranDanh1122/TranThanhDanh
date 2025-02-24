import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormFC from "./features/FormFC"
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <main className="h-screen w-full flex items-center justify-center bg-slate-200">
      <Card className="bg-white lg:w-2/3 md:w-4/5 w-[90%] rounded-2xl border-none">
        <CardHeader>
          <CardTitle className="uppercase text-center text-[#280d5f] font-extrabold">Currency Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <FormFC />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <CardDescription className="text-sm italic text-slate-400">* Please make sure the information is correct before swapping.</CardDescription>
          <CardDescription className="text-sm italic text-slate-400">* If you click swap, you agree to our Terms and Policies.</CardDescription>
        </CardFooter>
      </Card>
      <Toaster />
    </main>
  )
}

export default App
