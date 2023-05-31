import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  NewCounter,
  StartCounting,
  StopCounting
} from "../generated/Counter/Counter"

export function createNewCounterEvent(counter: BigInt): NewCounter {
  let newCounterEvent = changetype<NewCounter>(newMockEvent())

  newCounterEvent.parameters = new Array()

  newCounterEvent.parameters.push(
    new ethereum.EventParam(
      "counter",
      ethereum.Value.fromUnsignedBigInt(counter)
    )
  )

  return newCounterEvent
}

export function createStartCountingEvent(id: BigInt): StartCounting {
  let startCountingEvent = changetype<StartCounting>(newMockEvent())

  startCountingEvent.parameters = new Array()

  startCountingEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return startCountingEvent
}

export function createStopCountingEvent(): StopCounting {
  let stopCountingEvent = changetype<StopCounting>(newMockEvent())

  stopCountingEvent.parameters = new Array()

  return stopCountingEvent
}

