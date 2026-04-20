## Lakeland rowing club basic weather conditions predictor

This is a pretty much a simple weather app. It takes weather from Open Meteo and uses it to predict conditions at The Isthmus. This is useful for working out is a club session is worth going to.

The weather is a simple API.

Conditions are calculated based on some simple parameters

1. Constant wind speed (generally less than 15mph works for me)
2. Gusting wind speed (gusting less than 20 mph)
3. Rain (anything more than a light drizzle and I'm out)

It then looks at the conditions and returns the prediction at the selected time. So, adults weekend is between 8am and 10 am, Juniors between 10am and 12pm and for evening sessions its 6pm to 8pm.

Its a bit harder to give a completely accurate picture as wind direction needs to be taken into account. Mostly, breeze is westerly. Which means the Lingholm side is preferred. But if its South Westerly it's less predictable. Southerly is a pest and Easterly means that Ashness should be better. But it's not always that good. So use it as an indicator rather than absolute.


Because this is a simple website it can be loaded onto a phone using chrome or safari and then saved to the home screen. this will 'install' it as an app so changes to the settings are persistent