export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Admin Management System. All rights reserved.
          </p>
        </div>
 
      </div>
    </footer>
  )
}
