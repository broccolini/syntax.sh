require(
  ["lib/zepto.min", "lib/underscore.min", "lib/markdown.min",
   "lib/highlight.pack"],
  function() {
    hljs.initHighlighting();
    var Markdown = markdown;

    var langs = [
      ['javascript', 'JavaScript', 'js'],
      ['ruby', 'Ruby', 'rb'],
      ['lua', 'Lua', 'lua'],
      ['objectivec', 'Objective-C', 'm'],
      ['python', 'Python', 'py']
    ];

    var langData = {};
    var loadLangData = function(langName, topic, ext, cb) {
      if (!langData[langName]) {
        langData[langName] = {};
      }

      if (langData[langName][topic]) {
        cb(langData[langName][topic]);
        return;
      }

      $.get('langs/'+langName+'/'+topic+'.'+ext, function(example) {
        langData[langName][topic] = example;
        cb(example);
      });
    };

    var $langA = $('#lang_a');
    var $langB = $('#lang_b');

    $('.lang_select').each(function() {
        var $select = $(this);
        _(langs).each(function(lang) {
          var $option = $('<option />', { value:lang[0], text: lang[1], 'data-ext': lang[2] });
          $select.append($option);
        });
    });

    $('ul.topics > li').each(function() {
      var $li = $(this);
      var $a = $(this).find('a').attr('class', 'col1');
      var $aCol = $("<div />", {'class': "lang_a col2"});
      var $bCol = $("<div />", {'class': "lang_b col3"});
      $li.append($aCol);
      $li.append($bCol);
    });

    $('.lang_select').change(function() {
      var $select = $(this);
      var langClass = '.' + $select.attr("id");
      var selectedLang = $select.val();
      var selectedLangExt = $select.find('option[value='+$select.val()+']')
          .attr('data-ext');

      $('ul.topics > li').each(function() {
        var $li = $(this);
        var topic = $li.attr('id');

        loadLangData(selectedLang, topic, selectedLangExt, function(example) {

          var $langCol = $li.find(langClass);

          if (example) {
            var md = Markdown.toHTML(example);
            $langCol.html(md);

            var $code = $langCol.find('code');
            $code.attr('class', selectedLang);
            var hi = hljs.highlight(selectedLang, $code.html()).value;
            $code.html(hi);
          }
        });
      });
    });

    $langA.val('javascript').change();
    $langB.val('ruby').change();
  });
