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
  "extensions": ["validateCount"]
},
{
  "type": "textgen",
  "message0": "Text generation %1 using GPT-3.5",
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
  "helpUrl": "",
  "extensions": ["validateCount"]
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
  "helpUrl": "",
  "extensions": ["validateCount"]
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
  "helpUrl": "",
  "extensions": ["validateCount"]
},
{
  "type": "autopost",
  "message0": "Auto posting %1 using GPT-3.5 %2 Posting everyday on %3",
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
  "extensions": ["validateCount", "hoursDropDown", "minutesDropDown"]
},
{
  "type": "moderation",
  "message0": "Comment content moderation",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 95,
  "tooltip": "Ability to moderate good conduct for new comments",
  "helpUrl": "",
  "extensions": ["validateCount"]
},
{
  "type": "summarazation",
  "message0": "Post content summarization",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 115,
  "tooltip": "Ability to summarize content of a post",
  "helpUrl": "",
  "extensions": ["validateCount"]
},
{
  "type": "translate",
  "message0": "Post content translation",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 135,
  "tooltip": "Ability to translate content of a post",
  "helpUrl": "",
  "extensions": ["validateCount"]
},
{
  "type": "rephrase",
  "message0": "Post content paraphrasing",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 155,
  "tooltip": "Ability to rephrase content of a post",
  "helpUrl": "",
  "extensions": ["validateCount"]
},
{
  "type": "edit",
  "message0": "Post content fixing mistakes",
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 175,
  "tooltip": "Ability to fix content of a post",
  "helpUrl": "",
  "extensions": ["validateCount"]
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
      "name": "NAME",
      "colour": "#666666"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "NAME",
      "colour": "#c0c0c0"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 240,
  "tooltip": "Select colours from which the blog's colour theme will be determined",
  "helpUrl": "",
  "extensions": ["validateCount"]
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
  "helpUrl": "",
  "extensions": ["validateCount"]
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
  'validateCount',
  function() {
    this.onchange = function(){
      if (this.workspace.getBlocksByType(this.type).length > 1) {
        this.setWarningText("This block can only be used once.");
        this.setEnabled(false);
      } else if (this.getSurroundParent()) {
        this.setWarningText(null);
        this.setEnabled(true);
      }
    }
  });

Blockly.Extensions.register(
  'validateType',
  function() {
    this.onchange = function(){
      var child_count = this.getChildren().length;

      if(child_count > 0) {
        var child_block = this.getChildren()[0];
        checkFeatures(child_block);
    
        while(child_block.getNextBlock()) {
          child_block = child_block.getNextBlock();
          checkFeatures(child_block);
        };
      }
      
      if(child_count > 1) {
        child_block = this.getChildren()[1];
        checkStyle(child_block);
    
        while(child_block.getNextBlock()) {
          child_block = child_block.getNextBlock();
          checkStyle(child_block);
        };
      }
    }
  });

const checkFeatures = function(block) {
  const validValues = ["textgen", "imagegen", "autocomments", "moderation", "autopost", "summarazation", "translate"];

  if (!validValues.includes(block.type)) {
    block.setEnabled(false);
  }
}

const checkStyle = function(block) {
  const validValues = ["blogname", "colourtheme"];

  if (!validValues.includes(block.type)) {
    console.log(block.type);
    block.setEnabled(false);
  }
}

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

codelabGenerator['colourtheme'] = function() {
  return `"ColourTheme": true,\n`
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
