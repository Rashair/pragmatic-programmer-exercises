time =  hour:hour12 ":" min:minute periodMult:period_abbr  	{ return hour * periodMult * 60 + min; }
            / hour:hour12 periodMult:period_abbr 		    { return hour * periodMult * 60 ; }
            / hour:hour24 ":" min:minute 					{ return parseInt(hour) * 60 + min; }
hour12 = ("1" [0-2]) 
	   / ("0" digit)   
       / digit
hour24 = ("2" [0-3]) 
	   / ([0-1] digit) 
       / digit 
minute = tenDigit:[0-5] unityDigit:digit 	{ return tenDigit * 10 + unityDigit; }
digit  = dig:[0-9] 						 	{ return parseInt(dig); }
period_abbr = "am" { return 1; } 
			/ "pm" { return 2; } 
