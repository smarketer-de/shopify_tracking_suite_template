import BaseModule from "./BaseModule";

export default class GoogleUAModule extends BaseModule {
  moduleName = "Google Universal Analytics"
  color = "yellow"

  uaId = "";
  conversionLabel = "";

  getDetails() {
    return [
        {
            name: 'Name Prefix',
            value: this.namePrefix
        },
        {
            name: "UA ID",
            value: this.uaId
        },
    ];
  }

  getTags(): any[] {
    return [
      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `GAnalytics${this.getNamePrefix()} - E-Commerce + UA - all Pages`,
        "type": "ua",
        "parameter": [
            {
                "type": "BOOLEAN",
                "key": "overrideGaSettings",
                "value": "true"
            },
            {
                "type": "BOOLEAN",
                "key": "useEcommerceDataLayer",
                "value": "true"
            },
            {
                "type": "TEMPLATE",
                "key": "trackType",
                "value": "TRACK_PAGEVIEW"
            },
            {
                "type": "TEMPLATE",
                "key": "gaSettings",
                "value": `{{Google Analytics${this.getNamePrefix()} - UA-ID}}`
            },
            {
                "type": "BOOLEAN",
                "key": "enableEcommerce",
                "value": "true"
            }
        ],
        "fingerprint": this.getFingerprint(),
        "firingTriggerId": [
            "56", // CMP Change
            "57" // STS Ready
        ],
        "tagFiringOption": "ONCE_PER_LOAD",
        "monitoringMetadata": {
            "type": "MAP"
        },
        "consentSettings": {
            "consentStatus": "NOT_SET"
        }
      },
    ];
  }
  getTriggers(): any[] {
    return [

      {
        "accountId": "0",
        "containerId": "0",
        "triggerId": "57",
        "name": "STS Ready - CMP GAnalytics Consented",
        "type": "CUSTOM_EVENT",
        "customEventFilter": [
            {
                "type": "EQUALS",
                "parameter": [
                    {
                        "type": "TEMPLATE",
                        "key": "arg0",
                        "value": "{{_event}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "sts:start"
                    }
                ]
            }
        ],
        "filter": [
            {
                "type": "CONTAINS",
                "parameter": [
                    {
                        "type": "TEMPLATE",
                        "key": "arg0",
                        "value": "{{CMP - Has accepted Google Analytics}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "true"
                    }
                ]
            }
        ],
        "fingerprint": this.getFingerprint()
      },

      {
        "accountId": "0",
        "containerId": "0",
        "triggerId": "56",
        "name": "CMP Change - GAnalytics Consented",
        "type": "CUSTOM_EVENT",
        "customEventFilter": [
            {
                "type": "EQUALS",
                "parameter": [
                    {
                        "type": "TEMPLATE",
                        "key": "arg0",
                        "value": "{{_event}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "sts:cmp-change"
                    }
                ]
            }
        ],
        "filter": [
            {
                "type": "CONTAINS",
                "parameter": [
                    {
                        "type": "TEMPLATE",
                        "key": "arg0",
                        "value": "{{CMP - Has accepted Google Analytics}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "true"
                    }
                ]
            }
        ],
        "fingerprint": this.getFingerprint()
      },

    ];
  }
  getVariables(): any[] {
      return [
        {
          "accountId": "0",
          "containerId": "0",
          "variableId": this.getDynamicId(),
          "name": `Google Analytics${this.getNamePrefix()} - UA-ID`,
          "type": "gas",
          "parameter": [
              {
                  "type": "TEMPLATE",
                  "key": "cookieDomain",
                  "value": "auto"
              },
              {
                  "type": "BOOLEAN",
                  "key": "doubleClick",
                  "value": "false"
              },
              {
                  "type": "BOOLEAN",
                  "key": "setTrackerName",
                  "value": "false"
              },
              {
                  "type": "BOOLEAN",
                  "key": "useDebugVersion",
                  "value": "false"
              },
              {
                  "type": "LIST",
                  "key": "fieldsToSet",
                  "list": [
                      {
                          "type": "MAP",
                          "map": [
                              {
                                  "type": "TEMPLATE",
                                  "key": "fieldName",
                                  "value": "anonymizeIp"
                              },
                              {
                                  "type": "TEMPLATE",
                                  "key": "value",
                                  "value": "true"
                              }
                          ]
                      }
                  ]
              },
              {
                  "type": "BOOLEAN",
                  "key": "useHashAutoLink",
                  "value": "false"
              },
              {
                  "type": "BOOLEAN",
                  "key": "decorateFormsAutoLink",
                  "value": "false"
              },
              {
                  "type": "BOOLEAN",
                  "key": "enableLinkId",
                  "value": "false"
              },
              {
                  "type": "BOOLEAN",
                  "key": "enableEcommerce",
                  "value": "false"
              },
              {
                  "type": "TEMPLATE",
                  "key": "trackingId",
                  "value": this.uaId
              }
          ],
          "fingerprint": this.getFingerprint()
        },
        {
          "accountId": "0",
          "containerId": "0",
          "variableId": "39",
          "name": "CMP - Has accepted Google Analytics",
          "type": "v",
          "parameter": [
              {
                  "type": "INTEGER",
                  "key": "dataLayerVersion",
                  "value": "2"
              },
              {
                  "type": "BOOLEAN",
                  "key": "setDefaultValue",
                  "value": "false"
              },
              {
                  "type": "TEMPLATE",
                  "key": "name",
                  "value": "cmp.status.analytics"
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
        },
      ];
  }
}