
Blockly.TableGen['addri'] = function(block) {
    var value_rn = Blockly.TableGen.valueToCode(block, 'rn', Blockly.TableGen.ORDER_ATOMIC);
    // TODO: Assemble TableGen into code variable.
    var code = '...;\n';
    return [code, Blockly.TableGen.ORDER_NONE];
};

Blockly.TableGen['rn'] = function(block) {
    var value_rd = Blockly.TableGen.valueToCode(block, 'rd', Blockly.TableGen.ORDER_ATOMIC);
    // TODO: Assemble TableGen into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.TableGen.ORDER_NONE];
};

Blockly.TableGen['rd'] = function(block) {
    var value_imm32 = Blockly.TableGen.valueToCode(block, 'imm32', Blockly.TableGen.ORDER_ATOMIC);
    // TODO: Assemble TableGen into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.TableGen.ORDER_NONE];
};

Blockly.TableGen['imm32'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.TableGen.ORDER_NONE];
};
