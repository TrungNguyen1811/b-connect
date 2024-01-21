import { HelpCircle, PhoneCall, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

function Help() {
  return (
    <Dialog>
      <DialogTrigger className="flex">
        <HelpCircle size={20} />
        <p className="hidden-on-mobile">Help</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to find more information?</DialogTitle>
          <DialogDescription className="flex justify-between">
            <Card>
              <button>
                <CardHeader>
                  <CardTitle>
                    <PhoneCall />
                  </CardTitle>
                  <CardDescription>Phone number: 19001221</CardDescription>
                </CardHeader>
              </button>
            </Card>
            <Card>
              <button>
                <CardHeader>
                  <CardTitle>
                    <Mail />
                  </CardTitle>
                  <CardDescription>Submit your question!!!</CardDescription>
                </CardHeader>
              </button>
            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default Help
