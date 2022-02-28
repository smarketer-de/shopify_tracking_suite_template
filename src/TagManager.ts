import BaseModule from "./modules/BaseModule";
import { TagManagerTemplate } from './types';

const BASE_TEMPLATE : TagManagerTemplate = {
  "exportFormatVersion": 2,
  "containerVersion": {
      "tag": [],
      "trigger": [],
      "variable": [],
      "builtInVariable": [
          {
              "accountId": "0",
              "containerId": "0",
              "type": "PAGE_URL",
              "name": "Page URL"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "type": "PAGE_HOSTNAME",
              "name": "Page Hostname"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "type": "PAGE_PATH",
              "name": "Page Path"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "type": "REFERRER",
              "name": "Referrer"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "type": "EVENT",
              "name": "Event"
          }
      ],
      "customTemplate": [
          {
              "accountId": "0",
              "containerId": "0",
              "templateId": "35",
              "name": "Purchase Value Type",
              "fingerprint": "1635945447080",
              "templateData": "___INFO___\n\n{\n  \"type\": \"MACRO\",\n  \"id\": \"cvt_temp_public_id\",\n  \"version\": 1,\n  \"securityGroups\": [],\n  \"displayName\": \"Purchase Value Type\",\n  \"description\": \"\",\n  \"containerContexts\": [\n    \"WEB\"\n  ]\n}\n\n\n___TEMPLATE_PARAMETERS___\n\n[\n  {\n    \"type\": \"RADIO\",\n    \"name\": \"value\",\n    \"displayName\": \"Type\",\n    \"radioItems\": [\n      {\n        \"value\": \"net\",\n        \"displayValue\": \"Without VAT, without Shipping\"\n      },\n      {\n        \"value\": \"netWithShipping\",\n        \"displayValue\": \"Without VAT, with Shipping\"\n      },\n      {\n        \"value\": \"gross\",\n        \"displayValue\": \"With VAT, without Shipping\"\n      },\n      {\n        \"value\": \"grossWithShipping\",\n        \"displayValue\": \"With VAT, with Shipping\"\n      }\n    ],\n    \"simpleValueType\": true\n  }\n]\n\n\n___SANDBOXED_JS_FOR_WEB_TEMPLATE___\n\nreturn data.value;\n\n\n___TESTS___\n\nscenarios: []\n\n\n___NOTES___\n\n\n\n\n"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "templateId": "36",
              "name": "Consent Manager Selection",
              "fingerprint": "1635945447082",
              "templateData": "___INFO___\n\n{\n  \"type\": \"MACRO\",\n  \"id\": \"cvt_temp_public_id\",\n  \"version\": 1,\n  \"securityGroups\": [],\n  \"displayName\": \"Consent Manager Selection\",\n  \"description\": \"\",\n  \"containerContexts\": [\n    \"WEB\"\n  ]\n}\n\n\n___TEMPLATE_PARAMETERS___\n\n[\n  {\n    \"type\": \"RADIO\",\n    \"name\": \"value\",\n    \"displayName\": \"\",\n    \"radioItems\": [\n      {\n        \"value\": \"BeeClever\",\n        \"displayValue\": \"BeeClever CMP\"\n      },\n      {\n        \"value\": \"Shopify\",\n        \"displayValue\": \"Shopify CMP API\"\n      },\n      {\n        \"value\": \"none\",\n        \"displayValue\": \"None\"\n      }\n    ],\n    \"simpleValueType\": true\n  }\n]\n\n\n___SANDBOXED_JS_FOR_WEB_TEMPLATE___\n\nreturn data.value;\n\n\n___TESTS___\n\nscenarios: []\n\n\n___NOTES___\n\n\n\n\n"
          },
          {
              "accountId": "0",
              "containerId": "0",
              "templateId": "37",
              "name": "First Time Accessed Chooser",
              "fingerprint": "1635945447084",
              "templateData": "___INFO___\n\n{\n  \"type\": \"MACRO\",\n  \"id\": \"cvt_temp_public_id\",\n  \"version\": 1,\n  \"securityGroups\": [],\n  \"displayName\": \"First Time Accessed Chooser\",\n  \"description\": \"\",\n  \"containerContexts\": [\n    \"WEB\"\n  ]\n}\n\n\n___TEMPLATE_PARAMETERS___\n\n[\n  {\n    \"type\": \"CHECKBOX\",\n    \"name\": \"value\",\n    \"checkboxText\": \"Also Track Purchase when it\\u0027s not first time access\",\n    \"simpleValueType\": true,\n    \"defaultValue\": false,\n    \"help\": \"Check this checkbox if purchases should be tracked each time the status page is opened.\\nThis is useful for testing the tracking implementation on existing purchases.\"\n  }\n]\n\n\n___SANDBOXED_JS_FOR_WEB_TEMPLATE___\n\nreturn data.value;\n\n\n___TESTS___\n\nscenarios: []\n\n\n___NOTES___\n\n\n\n\n"
          }
      ]
  }
}

function hasDuplicates(arr: any[]) {
    return new Set(arr).size !== arr.length;
}

export function generateTemplate(modules: BaseModule[]) {
  const template = {...BASE_TEMPLATE};
  for(const mod of modules) {
    template.containerVersion.tag = template.containerVersion.tag.concat(mod.getTags());
    template.containerVersion.trigger = template.containerVersion.trigger.concat(mod.getTriggers());
    template.containerVersion.variable = template.containerVersion.variable.concat(mod.getVariables());
  }

  // Remove duplicate items
  console.log(
    'Before dedupe',
    template.containerVersion.tag.length,
    template.containerVersion.trigger.length,
    template.containerVersion.variable.length
  );
  const tagIds = template.containerVersion.tag.map(o => o.tagId)
  template.containerVersion.tag = template.containerVersion.tag.filter(({ tagId }, index) => !tagIds.includes(tagId, index + 1))

  const triggerIds = template.containerVersion.trigger.map(o => o.triggerId)
  template.containerVersion.trigger = template.containerVersion.trigger.filter(({ triggerId }, index) => !triggerIds.includes(triggerId, index + 1))

  const variableIds = template.containerVersion.variable.map(o => o.variableId)
  template.containerVersion.variable = template.containerVersion.variable.filter(({ variableId }, index) => !variableIds.includes(variableId, index + 1))

  if (
    hasDuplicates(template.containerVersion.tag.map(o => o.name)) ||
    hasDuplicates(template.containerVersion.trigger.map(o => o.name)) ||
    hasDuplicates(template.containerVersion.variable.map(o => o.name))
  ) {
    alert("Duplicate names detected. Please make sure to use name prefixes when creating multiple modules of the same type. The template may not be able to import correctly.");
  }

  console.log(
    'After dedupe',
    template.containerVersion.tag.length,
    template.containerVersion.trigger.length,
    template.containerVersion.variable.length
  );
  console.log("Complete template", template);

  return JSON.stringify(template);
}
