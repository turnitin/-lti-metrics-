# lti-metrics
A node package to abstract metric reporting. Currently wraps New Relic metric reporting events.

## Adding metric tracking to an app
To add metric tracking to your app simply do the following:

1. Make sure to include the relevant New Relic snippet for your application in the HEAD tag of the root template. The snippet can be found in New Relic under:

	Browser > Settings > Application Settings

	In most cases this will already be done, usually in a Perl base template that loads the application. The snippet will determine the `appName` in New Relic.

	*Note:* The snippets which include metrics are _not_ included on development stages.

2. Add `lti-metrics` to the application build process (for example by adding it to package.json).

3. Include the `lti-metrics` module in the application: 

	```
	import 'lti-metrics';
	```
4. Call the `trackBehaviour` method in the application wherever it is required:

	```
	lti-metrics.trackBehaviour('assignment-settings-saved', { status: 'failed' });
	```
	
## Calling the trackBehaviour method
The `trackBehaviour` method accepts two arguments: 

`name` (String) - The name of the action as it will appear in Insights. Known as `actionName` in New Relic.

`attrs` (Object) - Optional metadata about the action. Adding it will enable querying data in New Relic using the `FACET` option. For example, passing an object which contains `status` allows creating a timeseries graph of success vs. failure.

### Example Insights query

```
SELECT count(*) FROM PageAction WHERE appName = 'Integrations: LTI FE Refactor' AND actionName = 'assignment-settings-saved' SINCE 1 day AGO FACET status TIMESERIES 1 hour 
```
