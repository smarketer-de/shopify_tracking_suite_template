import BaseModule from "./BaseModule";

export default class GoogleAnalytics4Module extends BaseModule {
  moduleName = "Google Analytics 4"
  color = "pink"

  id = "";
  conversionLabel = "";

  getDetails() {
    return [
        {
            name: 'Name Prefix',
            value: this.namePrefix
        },
        {
            name: "ID",
            value: this.id
        },
    ];
  }

  getTags(): any[] {
    return [
      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `GA4${this.getNamePrefix()} - Configuration - all Pages`,
        "type": "gaawc",
        "parameter": [
            {
                "type": "BOOLEAN",
                "key": "sendPageView",
                "value": "true"
            },
            {
                "type": "BOOLEAN",
                "key": "enableSendToServerContainer",
                "value": "false"
            },
            {
                "type": "TEMPLATE",
                "key": "measurementId",
                "value": `{{GA4${this.getNamePrefix()} - ID}}`
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

      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `GA4${this.getNamePrefix()} - Conversion Purchase - Thank you page`,
        "type": "gaawe",
        "parameter": [
            {
                "type": "TEMPLATE",
                "key": "eventName",
                "value": "purchase"
            },
            {
                "type": "LIST",
                "key": "eventParameters",
                "list": [
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "currency"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{Purchase - Currency}}"
                            }
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "value"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{Purchase - Value}}"
                            }
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "tax"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{GA4 - Purchase Tax}}"
                            }
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "shipping"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{GA4 - Purchase Shipping}}"
                            }
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "transaction_id"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{Purchase - ID}}"
                            }
                        ]
                    },
                    {
                        "type": "MAP",
                        "map": [
                            {
                                "type": "TEMPLATE",
                                "key": "name",
                                "value": "items"
                            },
                            {
                                "type": "TEMPLATE",
                                "key": "value",
                                "value": "{{GA4 - Purchase Items}}"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "TAG_REFERENCE",
                "key": "measurementId",
                "value": `GA4${this.getNamePrefix()} - Configuration - all Pages`
            }
        ],
        "fingerprint": this.getFingerprint(),
        "firingTriggerId": [
            "58" // Purchase
        ],
        "tagFiringOption": "ONCE_PER_EVENT",
        "monitoringMetadata": {
            "type": "MAP"
        },
        "consentSettings": {
            "consentStatus": "NOT_SET"
        }
      }
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

      {
        "accountId": "0",
        "containerId": "0",
        "triggerId": "58",
        "name": "Purchase - GAnalytics Consented",
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
                        "value": "{{CMP - Has accepted Google Analytics}}"
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

    ];
  }
  getVariables(): any[] {
      return [
        {
          "accountId": "0",
          "containerId": "0",
          "variableId": this.getDynamicId(),
          "name": `GA4${this.getNamePrefix()} - ID`,
          "type": "c",
          "parameter": [
              {
                  "type": "TEMPLATE",
                  "key": "value",
                  "value": this.id
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
      },
      {
          "accountId": "0",
          "containerId": "0",
          "variableId": "60",
          "name": "GA4 - Purchase Tax",
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
                  "value": "ecommerce.purchase.actionField.tax"
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
      },
      {
          "accountId": "0",
          "containerId": "0",
          "variableId": "61",
          "name": "GA4 - Purchase Shipping",
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
                  "value": "ecommerce.purchase.actionField.shipping"
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
      },
      {
          "accountId": "0",
          "containerId": "0",
          "variableId": "62",
          "name": "GA4 - Purchase Items",
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
                  "value": "ecommerce.purchase.products"
              }
          ],
          "fingerprint": this.getFingerprint(),
          "formatValue": {}
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