/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Helper functions for generating TableGen for blocks.
 * @author pc0805a@google.com (Chia-Wei, Chang)
 * Based on Rodrigo Queiro 's blocky Lua generator.
 */
'use strict';

goog.provide('Blockly.TableGen');

goog.require('Blockly.Generator');


/**
 * TableGen code generator.
 * @type {!Blockly.Generator}
 */
Blockly.TableGen = new Blockly.Generator('TableGen');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.TableGen.addReservedWords(
    // tablegen keywords:
    // https://releases.llvm.org/5.0.0/docs/TableGen/LangRef.html
    'bit,bits,class,code,dag,def,foreach,defm,field,in,int,let,list,multiclass,string'
);

/**
 * Order of operation ENUMs.
 * http://www.cs.columbia.edu/~sedwards/classes/2007/w4115-fall/reports/TableGen.pdf
 */
Blockly.TableGen.ORDER_HIGH = 0;            // Function calls
Blockly.TableGen.ORDER_STRCONCAT = 1;       // String concatenate operator ,
Blockly.TableGen.ORDER_MULTIPLICATIVE = 2;  // * / %
Blockly.TableGen.ORDER_ADDITIVE = 3;        // + -
Blockly.TableGen.ORDER_RELATIONAL = 4;      // < > <=  >=  == !=
Blockly.TableGen.ORDER_AND = 5;             // and
Blockly.TableGen.ORDER_OR = 6;              // or
Blockly.TableGen.ORDER_OUTPUT = 7;         // -> =
Blockly.TableGen.ORDER_NONE = 99;

/**
 * Note: TableGen is not supporting zero-indexing since the language itself is
 * one-indexed, so the generator does not repoct the oneBasedIndex configuration
 * option used for lists and text.
 */

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.TableGen.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.TableGen.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.TableGen.functionNames_ = Object.create(null);

  if (!Blockly.TableGen.variableDB_) {
    Blockly.TableGen.variableDB_ =
        new Blockly.Names(Blockly.TableGen.RESERVED_WORDS_);
  } else {
    Blockly.TableGen.variableDB_.reset();
  }
  Blockly.TableGen.variableDB_.setVariableMap(workspace.getVariableMap());
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.TableGen.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.TableGen.definitions_) {
    definitions.push(Blockly.TableGen.definitions_[name]);
  }
  // Clean up temporary data.
  delete Blockly.TableGen.definitions_;
  delete Blockly.TableGen.functionNames_;
  Blockly.TableGen.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.TableGen.scrubNakedValue = function(line) {
  return line + ';\n';
};



/**
 * Common tasks for generating TableGen from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The TableGen code created for this block.
 * @return {string} TableGen code with comments and subsequent blocks added.
 * @private
 */
Blockly.TableGen.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.TableGen.COMMENT_WRAP - 3);
    if (comment) {
        if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                        Blockly.TableGen.prefixLines(comment + '\n', ' * ') +
                        ' */\n';
        } else {
        commentCode += Blockly.TableGen.prefixLines(comment + '\n', '// ');
        }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
        if (block.inputList[i].type == Blockly.INPUT_VALUE) {
          var childBlock = block.inputList[i].connection.targetBlock();
          if (childBlock) {
            var comment = Blockly.TableGen.allNestedComments(childBlock);
            if (comment) {
              commentCode += Blockly.TableGen.prefixLines(comment, '// ');
            }
          }
        }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.TableGen.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};






