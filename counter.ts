import {
  NewCounter as NewCounterEvent,
  StartCounting as StartCountingEvent,
  StopCounting as StopCountingEvent
} from "../generated/Counter/Counter"
import { CountingUntil, NewCounter, StartCounting, StopCounting } from "../generated/schema"

export function handleNewCounter(event: NewCounterEvent): void {
  let entity = new NewCounter(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.counter = event.params.counter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const countingUntil = CountingUntil.loadLast()!;

  const counter = countingUntil.getI32('counter');
  if (!counter) {
    return;
  }
  countingUntil.setI32('counter', counter + 1);
}

export function handleStartCounting(event: StartCountingEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());
  let entity = new StartCounting(
    id,
  )
  entity.Counter_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save();

  let startCounting = new CountingUntil(id, event.params.id);
  startCounting.setI32('counter', 0);
  startCounting.save();
}

export function handleStopCounting(event: StopCountingEvent): void {
  let entity = new StopCounting(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
