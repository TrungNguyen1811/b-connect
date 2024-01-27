import { Button } from 'src/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'src/components/ui/card'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'

function ChangePassword() {
  return (
    <Card className="ml-80 mt-32 justify-center p-4">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password here. After saving, you will be logged out.</CardDescription>
      </CardHeader>
      <CardContent className="mx-10 space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter className="mx-10 justify-center py-4">
        <Button className="w-full">Save password</Button>
      </CardFooter>
    </Card>
  )
}
export default ChangePassword
