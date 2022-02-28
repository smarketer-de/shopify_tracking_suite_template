import BaseModule from "./BaseModule";

export default class MicrosoftAdsModule extends BaseModule {
  moduleName = "Microsoft Ads"
  color = "green"

  namePrefix = "";
  uetTag = "";

  getUetqName() {
    if (this.namePrefix.length > 0) {
      return 'uetq' + this.namePrefix.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
    return "uetq";
  }

  getDetails() {
    return [
        {
            name: 'Name Prefix',
            value: this.namePrefix
        },
        {
            name: "UET Tag",
            value: this.uetTag
        },
    ];
  }

  getTags(): any[] {
    return [
      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `MSAds${this.getNamePrefix()} - UET Tag - all Pages`,
        "type": "baut",
        "parameter": [
            {
                "type": "BOOLEAN",
                "key": "c_navTimingApi",
                "value": "false"
            },
            {
                "type": "TEMPLATE",
                "key": "tagId",
                "value": `{{MSAds${this.getNamePrefix()} - UET Tag ID}}`
            },
            {
                "type": "BOOLEAN",
                "key": "c_storeConvTrackCookies",
                "value": "true"
            },
            {
                "type": "TEMPLATE",
                "key": "uetqName",
                "value": this.getUetqName()
            },
            {
                "type": "BOOLEAN",
                "key": "c_disableAutoPageView",
                "value": "false"
            },
            {
                "type": "BOOLEAN",
                "key": "c_removeQueryFromUrls",
                "value": "false"
            },
            {
                "type": "TEMPLATE",
                "key": "eventType",
                "value": "PAGE_LOAD"
            }
        ],
        "fingerprint": this.getFingerprint(),
        "firingTriggerId": [
            "53", // CMP Change
            "54" // STS Ready
        ],
        "tagFiringOption": "ONCE_PER_LOAD",
        "monitoringMetadata": {
            "type": "MAP"
        },
        "consentSettings": {
            "consentStatus": "NOT_SET"
        }
      },
      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `MSAds${this.getNamePrefix()} - Conversion Purchase - Thank you page`,
        "type": "baut",
        "parameter": [
            {
                "type": "TEMPLATE",
                "key": "goalValue",
                "value": "{{Purchase - Value}}"
            },
            {
                "type": "TEMPLATE",
                "key": "p_currency",
                "value": "{{Purchase - Currency}}"
            },
            {
                "type": "TEMPLATE",
                "key": "uetqName",
                "value": this.getUetqName()
            },
            {
                "type": "TEMPLATE",
                "key": "eventType",
                "value": "VARIABLE_REVENUE"
            }
        ],
        "fingerprint": this.getFingerprint(),
        "firingTriggerId": [
            "55" // Purchase
        ],
        "tagFiringOption": "ONCE_PER_EVENT",
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
        "triggerId": "54",
        "name": "STS Ready - CMP MSAds Consented",
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
                        "value": "{{CMP - Has accepted MS Ads}}"
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
        "triggerId": "55",
        "name": "Purchase - MSAds Consented",
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
                        "value": "sts:purchase"
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
                        "value": "{{CMP - Has accepted MS Ads}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "true"
                    }
                ]
            },
            {
                "type": "CONTAINS",
                "parameter": [
                    {
                        "type": "TEMPLATE",
                        "key": "arg0",
                        "value": "{{Purchase - Should track event}}"
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
        "triggerId": "53",
        "name": "CMP Change - MSAds Consented",
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
                        "value": "{{CMP - Has accepted MS Ads}}"
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
          "variableId": "38",
          "name": "CMP - Has accepted MS Ads",
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
                  "value": "cmp.status.ms"
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
        },

        {
          "accountId": "0",
          "containerId": "0",
          "variableId": this.getDynamicId(),
          "name": `MSAds${this.namePrefix.length > 0 ? ` ${this.namePrefix}` : ''} - UET Tag ID`,
          "type": "c",
          "parameter": [
              {
                  "type": "TEMPLATE",
                  "key": "value",
                  "value": this.uetTag
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
        },
      ];
  }
}