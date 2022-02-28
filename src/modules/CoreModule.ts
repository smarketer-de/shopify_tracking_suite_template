import BaseModule from "./BaseModule";

export default class CoreModule extends BaseModule {
  moduleName = "Core"
  color = "pink"

  getTriggers(): any[] {
    return [{
        accountId: "0",
        containerId: "0",
        triggerId: "30",
        name: "Purchase",
        type: "CUSTOM_EVENT",
        customEventFilter: [{
          type: "EQUALS",
          parameter: [{
              type: "TEMPLATE",
              key: "arg0",
              value: "{{_event}}"
            },
            {
              type: "TEMPLATE",
              key: "arg1",
              value: "sts:purchase"
            }
          ]
        }],
        filter: [{
          type: "CONTAINS",
          parameter: [{
              type: "TEMPLATE",
              key: "arg0",
              value: "{{Purchase - Should track event}}"
            },
            {
              type: "TEMPLATE",
              key: "arg1",
              value: "true"
            }
          ]
        }],
        fingerprint: this.getFingerprint()
      },
      {
        accountId: "0",
        containerId: "0",
        triggerId: "31",
        name: "STS Ready",
        type: "CUSTOM_EVENT",
        customEventFilter: [{
          type: "EQUALS",
          parameter: [{
              type: "TEMPLATE",
              key: "arg0",
              value: "{{_event}}"
            },
            {
              type: "TEMPLATE",
              key: "arg1",
              value: "sts:start"
            }
          ]
        }],
        fingerprint: this.getFingerprint()
      },
      {
        accountId: "0",
        containerId: "0",
        triggerId: "32",
        name: "Add Product to Cart",
        type: "CUSTOM_EVENT",
        customEventFilter: [{
          type: "EQUALS",
          parameter: [{
              type: "TEMPLATE",
              key: "arg0",
              value: "{{_event}}"
            },
            {
              type: "TEMPLATE",
              key: "arg1",
              value: "addToCart"
            }
          ]
        }],
        fingerprint: this.getFingerprint()
      }
    ];
  }
  getVariables(): any[] {
    return [
        {
          accountId: "0",
          containerId: "0",
          variableId: "21",
          name: "Purchase - Value",
          type: "jsm",
          parameter: [
            {
              type: "TEMPLATE",
              key: "javascript",
              value: "function() {\n  var purchase = {{Purchase - all Data}};\n\n  switch({{[Customize] Purchase Value Tracking Type}}) {\n  \n    case 'net':\n      return purchase.subvalue - purchase.productTax;\n    case 'netWithShipping':\n      return purchase.value - purchase.tax;\n    case 'gross':\n      return purchase.subvalue;\n    case 'grossWithShipping':\n      return purchase.value;\n   \n  }\n\n}",
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "22",
          name: "Purchase - ID",
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
              value: "purchase.order"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "23",
          name: "Purchase - Currency",
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
              value: "purchase.currency"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "29",
          name: "Purchase - Is first time accessed",
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
              value: "purchase.first_time_accessed"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "33",
          name: "[Customize] Purchase Value Tracking Type",
          type: "cvt_0_35",
          parameter: [
            {
              type: "TEMPLATE",
              key: "value",
              value: "net"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "34",
          name: "Purchase - all Data",
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
              value: "purchase"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "41",
          name: "[Customize] Also Track Purchase when it's not first time access (Test mode)",
          type: "cvt_0_37",
          parameter: [
            {
              type: "BOOLEAN",
              key: "value",
              value: "true"
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        },
        {
          accountId: "0",
          containerId: "0",
          variableId: "42",
          name: "Purchase - Should track event",
          type: "jsm",
          parameter: [
            {
              type: "TEMPLATE",
              key: "javascript",
              value: "function() {\n  if ({{[Customize] Also Track Purchase when it's not first time access (Test mode)}}) {\n    return true;\n  }\n  return {{Purchase - Is first time accessed}};\n}",
            }
          ],
          fingerprint: this.getFingerprint(),
          formatValue: {}
        }
      ];
  }
}
