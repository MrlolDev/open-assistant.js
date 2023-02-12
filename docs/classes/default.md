[open-assistant.js](../README.md) / [Exports](../modules.md) / default

# Class: default

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Methods

- [acceptTask](default.md#accepttask)
- [getAvailability](default.md#getavailability)
- [getLeaderboard](default.md#getleaderboard)
- [getTask](default.md#gettask)
- [rejectTask](default.md#rejecttask)
- [solveTask](default.md#solvetask)

## Constructors

### constructor

• **new default**(`apiKey`, `apiUrl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apiKey` | `string` |
| `apiUrl` | `string` |

#### Defined in

[classes/Client.ts:11](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L11)

## Methods

### acceptTask

▸ **acceptTask**(`taskId`, `user`, `messageId?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `taskId` | `string` |
| `user` | `default` |
| `messageId?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[classes/Client.ts:33](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L33)

___

### getAvailability

▸ **getAvailability**(`options`, `lang`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `default` |
| `lang` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[classes/Client.ts:19](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L19)

___

### getLeaderboard

▸ **getLeaderboard**(`timeFrame?`, `maxCount?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeFrame` | ``"day"`` \| ``"week"`` \| ``"month"`` \| ``"total"`` | `'day'` |
| `maxCount` | `number` | `100` |

#### Returns

`Promise`<`any`\>

#### Defined in

[classes/Client.ts:69](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L69)

___

### getTask

▸ **getTask**(`options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `default` |

#### Returns

`Promise`<`any`\>

#### Defined in

[classes/Client.ts:16](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L16)

___

### rejectTask

▸ **rejectTask**(`taskId`, `reason`, `user`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `taskId` | `string` |
| `reason` | `string` |
| `user` | `default` |

#### Returns

`Promise`<`any`\>

#### Defined in

[classes/Client.ts:26](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L26)

___

### solveTask

▸ **solveTask**(`task`, `user`, `lang`, `content`, `messageId`, `userMessageId?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | `default` |
| `user` | `default` |
| `lang` | `string` |
| `content` | `default` |
| `messageId` | `string` |
| `userMessageId?` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[classes/Client.ts:43](https://github.com/MrlolDev/open-assistant.js/blob/9b00037/src/classes/Client.ts#L43)
