import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { NewCounter } from "../generated/schema"
import { NewCounter as NewCounterEvent } from "../generated/Counter/Counter"
import { handleNewCounter, handleStartCounting } from "../src/counter"
import { createNewCounterEvent, createStartCountingEvent } from "./counter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let counter = BigInt.fromI32(234)
    let newNewCounterEvent = createStartCountingEvent(counter)
    handleStartCounting(newNewCounterEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewCounter created and stored", () => {
    assert.entityCount("StartCounting", 1)


    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
