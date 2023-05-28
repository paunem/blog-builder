Blockly.defineBlocksWithJsonArray([
{
  "type": "blog",
  "message0": "Blog base %1 Select features: %2 %3 Select style: %4 %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "features"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "styles"
    }
  ],
  "inputsInline": false,
  "colour": 0,
  "tooltip": "Container to select features and styles for the blog",
  "extensions": ["validateBlocks"]
},
{
  "type": "textgen",
  "message0": "Text generation %1 using GPT-3",
  "args0": [
    {
      "type": "input_dummy"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "Ability to generate text for a new post",
  "helpUrl": ""
},
{
  "type": "imagegen",
  "message0": "Image generation %1 using DALL·E",
  "args0": [
    {
      "type": "input_dummy"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 45,
  "tooltip": "Ability to generate an image for a new post",
  "helpUrl": ""
},
{
  "type": "autocomments",
  "message0": "Auto comment answering %1 using T5",
  "args0": [
    {
      "type": "input_dummy"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 60,
  "tooltip": "Ability to automatically answer to posts comments",
  "helpUrl": ""
},
{
  "type": "autopost",
  "message0": "Auto posting %1 using GPT-3 %2 Posting everyday on %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy",
      "name": "hoursInput"
    },
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 75,
  "tooltip": "Ability to automatically generate posts on a schedule",
  "helpUrl": "",
  "extensions": ["hoursDropDown", "minutesDropDown"]
},
{
  "type": "moderation",
  "message0": "Comment content moderation",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 95,
  "tooltip": "Ability to moderate good conduct for new comments",
  "helpUrl": ""
},
{
  "type": "summarazation",
  "message0": "Post content summarization",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 115,
  "tooltip": "Ability to summarize content of a post",
  "helpUrl": ""
},
{
  "type": "translate",
  "message0": "Post content translation",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 135,
  "tooltip": "Ability to translate content of a post",
  "helpUrl": ""
},
{
  "type": "rephrase",
  "message0": "Post content paraphrasing",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 155,
  "tooltip": "Ability to rephrase content of a post",
  "helpUrl": ""
},
{
  "type": "edit",
  "message0": "Post content auto correct",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 175,
  "tooltip": "Ability to fix content of a post",
  "helpUrl": ""
},
{
  "type": "colourtheme",
  "message0": "Colour theme %1 Main colour: %2 %3 Secondary colour: %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "colour1",
      "colour": "#666666"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "colour2",
      "colour": "#c0c0c0"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 240,
  "tooltip": "Select colours from which the blog's colour theme will be determined",
  "helpUrl": ""
},
{
  "type": "blogname",
  "message0": "Blog name %1 Enter a blog name: %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "blogName",
      "text": "Smart Blog"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Select a name for the blog",
  "helpUrl": ""
}
]);

var codelabToolbox = `
<xml id="toolbox" style="display: none">
<block type="blog"/>

<label text="Features" web-class="myLabelStyle"></label>
<block type="textgen"/>
<block type="imagegen"/>
<block type="autocomments"/>
<block type="autopost"/>
<block type="moderation"/>
<block type="summarazation"/>
<block type="translate"/>
<block type="rephrase"/>
<block type="edit"/>

<label text="Style"></label>
<block type="blogname"/>
<block type="colourtheme"/>

<button text="CREATE" callbackKey="createClick"></button>
</xml>
`;

Blockly.Extensions.register(
  'validateBlocks',
  function() {
    this.onchange = function(){
      var features_block = this.getInputTargetBlock('features');
      if(features_block)
      do{ 
        var isFeature = checkFeatures(features_block);
        var isValidCount = validateCount(features_block);

        if (!isFeature){
          features_block.setWarningText("This is not a block for features.");
          features_block.setEnabled(false);
        }
        else if (!isValidCount) {
          features_block.setWarningText("This block can only be used once.");
          features_block.setEnabled(false);
        }
        else {
          features_block.setWarningText(null);
          features_block.setEnabled(true);
        }
        } while (features_block = features_block.getNextBlock());
      
      var style_block =  this.getInputTargetBlock('styles');
      if(style_block)
      do{ 
        var isStyle = checkStyle(style_block);
        var isValidCount = validateCount(style_block);

        if (!isStyle){
          style_block.setWarningText("This is not a block for style.");
          style_block.setEnabled(false);
        }
        else if (!isValidCount) {
          style_block.setWarningText("This block can only be used once.");
          style_block.setEnabled(false);
        }
        else {
          style_block.setWarningText(null);
          style_block.setEnabled(true);
        }
        } while (style_block = style_block.getNextBlock());
    }
  });

const validateCount = function(block) {
  if (block.workspace.getBlocksByType(block.type).length > 1) {
    return false;
  } else if (block.getSurroundParent()) {
    return true;
  }
};

const checkFeatures = function(block) {
  const validValues = ["textgen", "imagegen", "autocomments", "moderation", "autopost", "summarazation", "translate", "rephrase", "edit"];

  if (!validValues.includes(block.type)) {
    return false;
  }
  return true;
};

const checkStyle = function(block) {
  const validValues = ["blogname", "colourtheme"];

  if (!validValues.includes(block.type)) {
    return false;
  }
  return true;
};

const codelabGenerator = new Blockly.Generator('DOTNET');

codelabGenerator['blog'] = function (block) {
  /*this.setDeletable(false);
  this.setMovable(false);
  this.setEditable(false);*/
  
  var output =`{\n`;
  var child_count = block.getChildren().length;

  if(child_count > 0) {
    var child_block = block.getChildren()[0];
    output += codelabGenerator.blockToCode(child_block);

    while(child_block.getNextBlock()) {
      output += codelabGenerator.blockToCode(child_block.getNextBlock());
      child_block = child_block.getNextBlock();
    };
  }
  
  if(child_count > 1) {
    child_block = block.getChildren()[1];
    output += codelabGenerator.blockToCode(child_block);

    while(child_block.getNextBlock()) {
      output += codelabGenerator.blockToCode(child_block.getNextBlock());
      child_block = child_block.getNextBlock();
    };
  }
  
  output += '}'

  return output;
};

codelabGenerator['textgen'] = function() {
  return `"TextGen": true,\n`
};

codelabGenerator['imagegen'] = function() {
  return `"ImageGen": true,\n`
};

codelabGenerator['autocomments'] = function() {
  return `"AutoComments": true,\n`
};

codelabGenerator['moderation'] = function() {
  return `"Moderation": true,\n`
};

codelabGenerator['autopost'] = function(block) {
  var hour = block.getFieldValue('hour');
  var minute = block.getFieldValue('minute');
  return `"AutoPost": true,\n"AutoPostHour": "`+ hour +`",\n"AutoPostMinute": "`+ minute +`",\n`
};

codelabGenerator['summarazation'] = function() {
  return `"Summarazation": true,\n`
};

codelabGenerator['translate'] = function() {
  return `"Translate": true,\n`
};

codelabGenerator['rephrase'] = function() {
  return `"Rephrase": true,\n`
};

codelabGenerator['edit'] = function() {
  return `"Edit": true,\n`
};

codelabGenerator['blogname'] = function(block) {
  var blogName = block.getFieldValue('blogName');
  return `"BlogName": "`+ blogName +`",\n`
};

codelabGenerator['colourtheme'] = function(block) {
  var colour1 = block.getFieldValue('colour1');
  var colour2 = block.getFieldValue('colour2');
  return `"ColourMain": "`+ colour1 +`",\n"ColourSec": "`+ colour2 +`",\n`
};

Blockly.Extensions.register('hoursDropDown',
  function() {
    this.getInput('hoursInput')
      .appendField(new Blockly.FieldDropdown(
        function() {
          var options = [];
          for(var i = 0; i < 24; i++) {
            let formattedValue = i.toString().padStart(2, '0');
            options.push([formattedValue, i.toString()]);
          }
          return options;
        }), 'hour');

    this.getInput('hoursInput')
      .appendField(":");
  });

  Blockly.Extensions.register('minutesDropDown',
  function() {
    this.getInput('hoursInput')
      .appendField(new Blockly.FieldDropdown(
        function() {
          var options = [];
          for(var i = 0; i < 60; i++) {
            let formattedValue = i.toString().padStart(2, '0');
            options.push([formattedValue, i.toString()]);
          }
          return options;
        }), 'minute');
  });
