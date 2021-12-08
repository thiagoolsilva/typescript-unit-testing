/*
 * Copyright (c) 2021  Thiago Lopes da Silva
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExternalServiceInterface } from "../src/external-service.interface";
import { Handler } from "../src/handler";
import { createSandbox } from "sinon";
import { describe } from "mocha";
import { expect } from "chai";
import { ExternalService } from "../src/external-service";

describe("Mocking external service calls", () => {
  const sinonSandbox = createSandbox();

  afterEach(() => {
    sinonSandbox.restore();
  });

  it("should pass if provided fake param", async () => {
    const externalService: ExternalServiceInterface = {
      getNameFromService: sinonSandbox.mock().resolves("fake"),
    };
    const handler = new Handler(externalService);
    const test = await handler.isExpectedName("fake");
    expect(test).to.equal(true);
  });
  it("should pass if provided fake param using prototype", async () => {
    const externalService: ExternalServiceInterface = new ExternalService();
    sinonSandbox.stub(ExternalService.prototype, "getNameFromService").resolves('fake');

    const handler = new Handler(externalService);
    const test = await handler.isExpectedName("fake");
    expect(test).to.equal(true);
  });
});
