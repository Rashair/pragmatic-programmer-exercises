time = hour:hour12 ":" min:minute periodOffset:period_abbr { return hour * 60 + periodOffset + min; }
     / hour:hour12 periodOffset:period_abbr                { return hour * 60  + periodMult; }
     / hour:hour24 ":" min:minute                          { return hour * 60 + min; }
hour12 = "1" dig:[0-2]   { return 10 + parseInt(dig); }
       / "0" dig:digit   { return dig; }
       / digit
hour24 = "2" dig:[0-3]            { return 20 + parseInt(dig); }
       / tenDigit:[0-1] dig:digit { return 10*parseInt(tenDigit) + dig; } 
       / digit 
minute = tenDigit:[0-5] dig:digit { return 10*tenDigit + dig; }
digit  = dig:[0-9]                { return parseInt(dig); }
period_abbr = "am" { return 0; } 
            / "pm" { return 12*60; } 
