import { TagManagerTag, TagManagerVariable } from "../types";
import BaseModule from "./BaseModule";

export default class GoogleAdsModule extends BaseModule {
  moduleName = "Google Ads"
  color = "indigo"

  conversionId = "";
  conversionLabel = "";
  withRemarketing = true;

  getDetails() {
    return [
        {
            name: 'Name Prefix',
            value: this.namePrefix
        },
        {
            name: "Conversion ID",
            value: this.conversionId
        },
        {
            name: "Conversion Label",
            value: this.conversionLabel
        },
        {
            name: "With Remarketing",
            value: this.withRemarketing ? 'Yes' : 'No'
        }
    ];
  }

  getTags(): any[] {
    const tags: TagManagerTag[] = [
      // Linker
      {
        accountId: "0",
        containerId: "0",
        tagId: "60",
        name: "GAds - Conversion Linker - all Pages",
        type: "gclidw",
        parameter: [
            {
            type: "BOOLEAN",
            key: "enableCrossDomain",
            value: "false"
            },
            {
            type: "BOOLEAN",
            key: "enableUrlPassthrough",
            value: "false"
            },
            {
            type: "BOOLEAN",
            key: "enableCookieOverrides",
            value: "false"
            }
        ],
        fingerprint: this.getFingerprint(),
        firingTriggerId: [
            "50", // CMP Change - GAds Consented
            "51" // STS Ready - CMP GAds Consented
        ],
        tagFiringOption: "ONCE_PER_LOAD",
        monitoringMetadata: {
            type: "MAP"
        },
        consentSettings: {
            consentStatus: "NOT_SET"
        }
      },

      // Conversion Tag
      {
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": `GAds${this.getNamePrefix()} - Conversion Purchase - Thank you page`,
        "type": "awct",
        "parameter": [
          {
              "type": "BOOLEAN",
              "key": "enableNewCustomerReporting",
              "value": "false"
          },
          {
              "type": "BOOLEAN",
              "key": "enableConversionLinker",
              "value": "true"
          },
          {
              "type": "TEMPLATE",
              "key": "orderId",
              "value": "{{Purchase - ID}}"
          },
          {
              "type": "BOOLEAN",
              "key": "enableProductReporting",
              "value": "false"
          },
          {
              "type": "TEMPLATE",
              "key": "conversionValue",
              "value": "{{Purchase - Value}}"
          },
          {
              "type": "TEMPLATE",
              "key": "conversionCookiePrefix",
              "value": "_gcl"
          },
          {
              "type": "BOOLEAN",
              "key": "enableShippingData",
              "value": "false"
          },
          {
              "type": "TEMPLATE",
              "key": "conversionId",
              "value": `{{Google Ads${this.getNamePrefix()} - Conversion ID}}`
          },
          {
              "type": "TEMPLATE",
              "key": "currencyCode",
              "value": "{{Purchase - Currency}}"
          },
          {
              "type": "TEMPLATE",
              "key": "conversionLabel",
              "value": `{{Google Ads${this.getNamePrefix()} - Conversion Label Purchase}}`
          },
          {
              "type": "BOOLEAN",
              "key": "rdp",
              "value": "false"
          }
        ],
        fingerprint: this.getFingerprint(),
        "firingTriggerId": [
            "52" // Purchase Gads Consented
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

    // Remarketing
    if (this.withRemarketing) {
      tags.push({
        "accountId": "0",
        "containerId": "0",
        "tagId": this.getDynamicId(),
        "name": "GAds - Remarketing - all Pages",
        "type": "sp",
        "parameter": [
          {
            "type": "BOOLEAN",
            "key": "enableDynamicRemarketing",
            "value": "false"
          },
          {
            "type": "LIST",
            "key": "customParams",
            "list": [
              {
                  "type": "MAP",
                  "map": [
                      {
                          "type": "TEMPLATE",
                          "key": "key",
                          "value": "ecomm_prodid"
                      },
                      {
                          "type": "TEMPLATE",
                          "key": "value",
                          "value": "{{Remarketing - ecomm_prodid}}"
                      }
                  ]
              },
              {
                  "type": "MAP",
                  "map": [
                      {
                          "type": "TEMPLATE",
                          "key": "key",
                          "value": "ecomm_pagetype"
                      },
                      {
                          "type": "TEMPLATE",
                          "key": "value",
                          "value": "{{Remarketing - ecomm_pagetype}}"
                      }
                  ]
              },
              {
                  "type": "MAP",
                  "map": [
                      {
                          "type": "TEMPLATE",
                          "key": "key",
                          "value": "ecomm_totalvalue"
                      },
                      {
                          "type": "TEMPLATE",
                          "key": "value",
                          "value": "{{Remarketing - ecomm_totalvalue}}"
                      }
                  ]
              }
            ]
          },
          {
            "type": "TEMPLATE",
            "key": "conversionId",
            "value": `{{Google Ads${this.getNamePrefix()} - Conversion ID}}`
          },
          {
            "type": "TEMPLATE",
            "key": "customParamsFormat",
            "value": "USER_SPECIFIED"
          },
          {
            "type": "BOOLEAN",
            "key": "rdp",
            "value": "false"
          }
        ],
        "fingerprint": this.getFingerprint(),
        "firingTriggerId": [
          "50", // CMP Change - GAds Consented
          "51" // STS Ready - CMP GAds Consented
        ],
        "tagFiringOption": "ONCE_PER_LOAD",
        "monitoringMetadata": {
            "type": "MAP"
        },
        "consentSettings": {
            "consentStatus": "NOT_SET"
        }
      });
    }

    return tags;
  }
  getTriggers(): any[] {
    return [
      {
        "accountId": "0",
        "containerId": "0",
        "triggerId": "50",
        "name": "CMP Change - GAds Consented",
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
                        "value": "{{CMP - Has accepted Google Ads}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "true"
                    }
                ]
            }
        ],
        fingerprint: this.getFingerprint(),
      },

      {
        "accountId": "6001114002",
        "containerId": "53700801",
        "triggerId": "51",
        "name": "STS Ready - CMP GAds Consented",
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
                        "value": "{{CMP - Has accepted Google Ads}}"
                    },
                    {
                        "type": "TEMPLATE",
                        "key": "arg1",
                        "value": "true"
                    }
                ]
            }
        ],
        fingerprint: this.getFingerprint(),
      },

      {
        "accountId": "0",
        "containerId": "0",
        "triggerId": "52",
        "name": "Purchase - GAds Consented",
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
                        "value": "{{CMP - Has accepted Google Ads}}"
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
        fingerprint: this.getFingerprint(),
      },
    ];
  }
  getVariables(): any[] {
      const vars: TagManagerVariable[] = [
        {
          "accountId": "0",
          "containerId": "0",
          "variableId": "28",
          "name": "CMP - Has accepted Google Ads",
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
                  "value": "cmp.status.ads"
              }
          ],
          fingerprint: this.getFingerprint(),
          "formatValue": {}
        },
        {
            "accountId": "0",
            "containerId": "0",
            "variableId": this.getDynamicId(),
            "name": `Google Ads${this.getNamePrefix()} - Conversion ID`,
            "type": "c",
            "parameter": [
                {
                    "type": "TEMPLATE",
                    "key": "value",
                    "value": this.conversionId
                }
            ],
            "fingerprint": this.getFingerprint(),
            "formatValue": {}
        },
        {
            "accountId": "0",
            "containerId": "0",
            "variableId": this.getDynamicId(),
            "name": `Google Ads${this.getNamePrefix()} - Conversion Label Purchase`,
            "type": "c",
            "parameter": [
                {
                    "type": "TEMPLATE",
                    "key": "value",
                    "value": this.conversionLabel
                }
            ],
            "fingerprint": this.getFingerprint(),
            "formatValue": {}
        },
      ];

      if (this.withRemarketing) {
        vars.push(
          {
            accountId: "0",
            containerId: "0",
            variableId: "25",
            name: "Remarketing - ecomm_prodid",
            type: "v",
            parameter: [
              {
                type: "INTEGER",
                key: "dataLayerVersion",
                value: "2"
              },
              {
                type: "BOOLEAN",
                key: "setDefaultValue",
                value: "false"
              },
              {
                type: "TEMPLATE",
                key: "name",
                value: "ecomm_prodid"
              }
            ],
            fingerprint: this.getFingerprint(),
            formatValue: {}
          },
          {
            accountId: "0",
            containerId: "0",
            variableId: "26",
            name: "Remarketing - ecomm_pagetype",
            type: "v",
            parameter: [
              {
                type: "INTEGER",
                key: "dataLayerVersion",
                value: "2"
              },
              {
                type: "BOOLEAN",
                key: "setDefaultValue",
                value: "false"
              },
              {
                type: "TEMPLATE",
                key: "name",
                value: "ecomm_pagetype"
              }
            ],
            fingerprint: this.getFingerprint(),
            formatValue: {}
          },
          {
            accountId: "0",
            containerId: "0",
            variableId: "27",
            name: "Remarketing - ecomm_totalvalue",
            type: "v",
            parameter: [
              {
                type: "INTEGER",
                key: "dataLayerVersion",
                value: "2"
              },
              {
                type: "BOOLEAN",
                key: "setDefaultValue",
                value: "false"
              },
              {
                type: "TEMPLATE",
                key: "name",
                value: "ecomm_totalvalue"
              }
            ],
            fingerprint: this.getFingerprint(),
            formatValue: {}
          },
        );
      }
 
      return vars;
  }
}