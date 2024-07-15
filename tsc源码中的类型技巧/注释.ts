function getHelperNames(helper) {
  switch (helper) {
    case 1 /* Extends */:
      return ['__extends']
    case 2 /* Assign */:
      return ['__assign']
    case 4 /* Rest */:
      return ['__rest']
    case 8 /* Decorate */:
      return legacyDecorators ? ['__decorate'] : ['__esDecorate', '__runInitializers']
    case 16 /* Metadata */:
      return ['__metadata']
    case 32 /* Param */:
      return ['__param']
    case 64 /* Awaiter */:
      return ['__awaiter']
    case 128 /* Generator */:
      return ['__generator']
    case 256 /* Values */:
      return ['__values']
    case 512 /* Read */:
      return ['__read']
    case 1024 /* SpreadArray */:
      return ['__spreadArray']
    case 2048 /* Await */:
      return ['__await']
    case 4096 /* AsyncGenerator */:
      return ['__asyncGenerator']
    case 8192 /* AsyncDelegator */:
      return ['__asyncDelegator']
    case 16384 /* AsyncValues */:
      return ['__asyncValues']
    case 32768 /* ExportStar */:
      return ['__exportStar']
    case 65536 /* ImportStar */:
      return ['__importStar']
    case 131072 /* ImportDefault */:
      return ['__importDefault']
    case 262144 /* MakeTemplateObject */:
      return ['__makeTemplateObject']
    case 524288 /* ClassPrivateFieldGet */:
      return ['__classPrivateFieldGet']
    case 1048576 /* ClassPrivateFieldSet */:
      return ['__classPrivateFieldSet']
    case 2097152 /* ClassPrivateFieldIn */:
      return ['__classPrivateFieldIn']
    case 4194304 /* SetFunctionName */:
      return ['__setFunctionName']
    case 8388608 /* PropKey */:
      return ['__propKey']
    case 16777216 /* AddDisposableResourceAndDisposeResources */:
      return ['__addDisposableResource', '__disposeResources']
    default:
      return Debug.fail('Unrecognized helper')
  }
}
