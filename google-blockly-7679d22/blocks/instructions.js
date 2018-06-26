/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Colour blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.instructions');  // Deprecated
goog.provide('Blockly.Constants.Instructions');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['addri'] = {
    init: function() {
      this.appendValueInput("rn")
          .setCheck("rn")
          .appendField("ADDri");
      this.setColour(20);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};

Blockly.Blocks['rn'] = {
    init: function() {
      this.appendValueInput("rd")
          .appendField("rn");
      this.setOutput(true, "rn");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};

Blockly.Blocks['rd'] = {
    init: function() {
        this.appendValueInput("imm32")
            .appendField("rd");
        this.setOutput(true, "rd");
        this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    }
};

Blockly.Blocks['imm32'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("imm32");
      this.setOutput(true, "imm32");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};