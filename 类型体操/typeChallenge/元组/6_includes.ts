type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Wamuu'> // expected to be `false`

type Includes<Arr extends string[], Target> = Target extends Arr[number] ? true : false
