import { HelpCircle, PhoneCall, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Help() {
  const { t } = useTranslation('translation')
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row items-center">
        <HelpCircle size={20} />
        <p className="hidden-on-mobile hidden-on-tablet">{t('Help')}</p>
      </DialogTrigger>
      <DialogContent className="w-[40vw]">
        <DialogHeader>
          <DialogTitle className="text-orange-500">Do you want to find more information?</DialogTitle>
          <DialogDescription className="flex justify-around pt-8">
            <button className="rounded-md hover:border hover:border-orange-600">
              <Card className="hover:text-orange-400">
                <CardHeader>
                  <CardTitle>
                    <PhoneCall />
                  </CardTitle>
                  <CardDescription>Phone number: 19001221</CardDescription>
                </CardHeader>
              </Card>
            </button>
            <Link
              onClick={() => setOpen(false)}
              className="rounded-md hover:border hover:border-orange-600"
              to={'/contact'}
            >
              <Card className="hover:text-orange-400">
                <CardHeader>
                  <CardTitle>
                    <Mail />
                  </CardTitle>
                  <CardDescription className="hover:text-none">Submit your question!!!</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default Help
