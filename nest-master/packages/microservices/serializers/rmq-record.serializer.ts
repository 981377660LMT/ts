import { ReadPacket } from '../interfaces';
import { Serializer } from '../interfaces/serializer.interface';
import { RmqRecord } from '../record-builders';

export class RmqRecordSerializer
  implements Serializer<ReadPacket, ReadPacket & Partial<RmqRecord>>
{
  serialize(packet: ReadPacket | any): ReadPacket & Partial<RmqRecord> {
    if (
      packet?.data &&
      typeof packet.data === 'object' &&
      packet.data instanceof RmqRecord
    ) {
      const record = packet.data as RmqRecord;
      return {
        ...packet,
        data: record.data,
        options: record.options,
      };
    }
    return packet;
  }
}
