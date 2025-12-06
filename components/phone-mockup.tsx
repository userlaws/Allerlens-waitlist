import { AlertTriangle, CheckCircle, Camera } from "lucide-react"

export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Main phone */}
      <div className="relative w-64 md:w-72 h-[500px] md:h-[560px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden relative">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-foreground/5 flex items-center justify-center">
            <div className="w-20 h-6 bg-foreground rounded-full" />
          </div>

          {/* App content */}
          <div className="pt-16 px-4 pb-4 h-full flex flex-col">
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-foreground">Menu Analysis</p>
              <p className="text-xs text-muted-foreground">Italian Bistro</p>
            </div>

            {/* Menu image placeholder */}
            <div className="relative flex-1 bg-muted rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
              <img src="/italian-restaurant-menu-with-pasta-dishes.jpg" alt="Scanned menu" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-card/95 backdrop-blur rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-foreground">Contains Gluten</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">Dairy-Free Options</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan button */}
            <button className="w-full bg-primary text-primary-foreground rounded-2xl py-3 flex items-center justify-center gap-2 font-medium">
              <Camera className="w-5 h-5" />
              Scan New Menu
            </button>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-4 md:-left-8 top-20 bg-card rounded-2xl shadow-xl p-3 border border-border animate-[float_3s_ease-in-out_infinite]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Peanuts</p>
            <p className="text-[10px] text-muted-foreground">High Risk</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 md:-right-8 top-40 bg-card rounded-2xl shadow-xl p-3 border border-border animate-[float_3s_ease-in-out_infinite_0.5s]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Safe Choice</p>
            <p className="text-[10px] text-muted-foreground">3 items found</p>
          </div>
        </div>
      </div>
    </div>
  )
}
