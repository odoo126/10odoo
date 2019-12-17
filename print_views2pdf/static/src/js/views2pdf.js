odoo.define('print_views2pdf.views2pdf', function (require) {
        "use strict";
    var core = require('web.core');
    var Model = require('web.DataModel');
    var WebClient = require('web.WebClient');
    var session = require('web.session');
    var ListView = require('web.ListView');
    var FormView = require('web.FormView');
    var PivotView = require('web.PivotView');
    var GraphView = require('web.GraphView');
    var CalendarView = require('web_calendar.CalendarView');
    var KanbanView = require('web_kanban.KanbanView');
    var framework = require('web.framework');
    var crash_manager = require('web.crash_manager');
     var Dialog = require('web.Dialog');

    var _t = core._t;
    var QWeb = core.qweb;

    // override FormView

    FormView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });

                    }
        },
         generate_pdf: function() {
         var a4 = [800, 841.89];
         var form = $('.o_form_view');
         var cache_width = form.width();
        html2canvas($('.o_form_view'), {
        useCORS: true,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(imgData, 'JPEG',-55, 30, 550, 250);
                    doc.save('form.pdf');
                    form.width(cache_width);
        }
    });

                  //  html2canvas($('.o_form_view'), {


        },

    });


    // override ListView

    ListView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    this.$buttons.on('click', '#create_pdf_export', function (e) {
                        e.preventDefault();
                        self.on_sidebar_export_treeview_xls_formate();

                    });
                                      }
        },
         on_sidebar_export_treeview_xls_formate: function () {
          var self = this;
          var location = self['visible_columns']
          var location_label = []
          var location_data = []
          var model_data = self['model']
          var data_set = self['dataset']['ids']


          for (var i in location) {
            location_label.push(location[i]['id'])
            location_data.push(location[i]['string'])
          }
          var pdfsize = 'a4';
          var doc = new jsPDF('l', 'pt', pdfsize);
          var custom_model = new  Model('res.company')
          custom_model.call('all_data_export', [model_data,model_data, location_label, data_set,self.dataset.context]).then(function(result) {

           doc.autoTable({
                        head: [location_data],
                        body: result,
                        theme:'grid',
                        startY: 140,
                        margin: {
                            top: 140,
                            left: 30,
                            right: 30,
                        },
                       overflowColumns: false

                    });
                        doc.save('Tree_view.pdf')


           });




         },
        generate_pdf: function() {
         var a4 = [800, 841.89];
         var form = $('.o_list_view');
         var cache_width = form.width();
        html2canvas($('.o_list_view'), {
        useCORS: true,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(imgData, 'JPEG', 20, 60, 500,80);
                    doc.save('list.pdf');
                    form.width(cache_width);
        }
    });

                  //  html2canvas($('.o_form_view'), {


        },

    });

    // override GraphView

    GraphView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }
        },
         generate_pdf: function() {
         var a4 = [800, 841.89];
         var form = $('.o_list_view');
         var cache_width = form.width();
        html2canvas($('.o_list_view'), {
        useCORS: true,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(imgData, 'JPEG', 20, 60);
                    doc.save('list.pdf');
                    form.width(cache_width);
        }
    });

                  //  html2canvas($('.o_form_view'), {


        },

    });

     // override KanbanView

    KanbanView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }
        },
         generate_pdf: function() {
         var a4 = [800, 841.89];
         var form = $('.o_kanban_view');
         var cache_width = form.width();
        html2canvas($('.o_kanban_view'), {
        useCORS: true,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(imgData, 'JPEG', 20, 60, 500,160);
                    doc.save('kanban.pdf');
                    form.width(cache_width);
        }
    });

                  //  html2canvas($('.o_form_view'), {


        },

    });
    // override PivotView

    PivotView.include({

        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.download_table_new();

                    });
                    }
        },
        download_table_new: function () {
        framework.blockUI();
        var nbr_measures = this.active_measures.length,
            headers = this.compute_headers(),
            measure_row = nbr_measures >= 1 ? _.last(headers) : [],
            rows = this.compute_rows(),
            i, j, value;
        headers[0].splice(0,1);
        // process measure_row
        for (i = 0; i < measure_row.length; i++) {
            measure_row[i].measure = this.measures[measure_row[i].measure].string;
        }
        // process all rows
        for (i =0, j, value; i < rows.length; i++) {
            for (j = 0; j < rows[i].values.length; j++) {
                value = rows[i].values[j];
                rows[i].values[j] = {
                    is_bold: (i === 0) || ((this.main_col.width > 1) && (j >= rows[i].values.length - nbr_measures)),
                    value:  (value === undefined) ? "" : value,
                };
            }
        }
        var table = {
            headers: _.initial(headers),
            measure_row: measure_row,
            rows: rows,
            nbr_measures: nbr_measures,
            title: this.title,
        };

        console.log("dasadsads", table)
         var list_head = []
            var pdfsize = 'a4';
            var doc = new jsPDF('l', 'pt', pdfsize);
            doc.page = 1; // use this as a counter.
            var self = this;
            // Preparing Table header
            var nbr_measures = table['nbr_measures'];
            var actual_measures = table['headers'].length;
            var header_list = [];
            var temp_dict = {}
            var temp_list = []
            for (var i = 0; i < table['headers'].length; i++) {
                temp_list = [{
                    content: "   ",
                    colSpan: 1,
                    styles: {halign: 'left'}
                }]
                for (var j = 0; j < table['headers'][i].length; j++) {
                    temp_dict = {
                        content: table['headers'][i][j]['title'].toString(),
                        colSpan: table['headers'][i][j]['width'],
                        styles: {halign: 'left'}
                    }
                    temp_list.push(temp_dict);
                }
                header_list.push(temp_list);
            }
            temp_list = [{
                content: "   ",
                colSpan: 1,
                styles: {halign: 'center'}
            }]
            for (var i = 0; i < table['measure_row'].length; i++) {
                temp_dict = {
                    content: table['measure_row'][i]['measure'].toString(),
                    colSpan: 1,
                    styles: {halign: 'center'}
                }
                temp_list.push(temp_dict);
            }
            header_list.push(temp_list);
            var answer_list = []
            for (i = 1; i < table['rows'].length; i++) {
                var answer_list2 = []
                var str = ''
                var len = 0;
                var space = ''
                if (table['rows'][i]['indent'] === 1){
                    str = '+' + table['rows'][i]['title'].toString()
                }
                if (table['rows'][i]['indent'] > 1){
                    str = '-' + table['rows'][i]['title'].toString()
                }

                if (table['rows'][i]['indent'] > 1){
                    len = str.length;
                    space = 4 * table['rows'][i]['indent'];
                }
                answer_list2.push(str.padStart(len + space, ' '))
                answer_list.push(answer_list2)
                for (var p = 0; p < table['rows'][i]['values'].length; p++) {
                    answer_list2.push(table['rows'][i]['values'][p]['value'].toString())
                }
            }



            var pdfsize = 'a4';
            var doc = new jsPDF('l', 'pt', pdfsize);


            var custom_model = new  Model('res.company')
            custom_model.call('all_company_data', [self.dataset.context]).then(function(result) {

                        var pageSize = doc.internal.pageSize;
                        doc.setFontSize(16);
                        doc.setTextColor(40);
                        var headerImgData = "data:image/png;base64," + result['logo'];
                        doc.addImage(headerImgData, 'JPEG', 30, 30, 150, 60);
                        doc.setFontType("bold");
                        doc.text(510, 30, result['name']);
                        doc.setFontStyle('normal');
                        doc.setFontSize(13);
                        if (result['complete_street'] !== undefined){
                            doc.text(510, 48, result['complete_street']);
                        }
                        if (result['remaining_address'] !== undefined){
                            doc.text(510, 66, result['remaining_address']);
                        }
                        if (result['phone'] !== undefined){
                            doc.text(510, 84, 'Tel: ' + result['phone']);
                        }
                        if (result['email'] !== undefined){
                            doc.text(510, 102, result['email']);
                        }
                        // Line
                        doc.setLineWidth(1.5); // #a24689
                        doc.setDrawColor(162, 70, 137);
                        doc.line(30, 110, pageSize.width - 30, 110);
                        doc.setFontSize(16);


                        // Preparing Header
                        var header = function(data) {
                            if (result['format_type'] == 'A'){
                                var pageSize = doc.internal.pageSize;
                                doc.setFontSize(16);
                                doc.setTextColor(40);
                                var headerImgData = "data:image/png;base64," + result['logo'];
                                doc.addImage(headerImgData, 'JPEG', 30, 30, 150, 60);
                                doc.setFontType("bold");
                                doc.text(510, 30, result['name']);
                                doc.setFontStyle('normal');
                                doc.setFontSize(13);
                                if (result['complete_street'] !== undefined){
                                    doc.text(510, 48, result['complete_street']);
                                }
                                if (result['remaining_address'] !== undefined){
                                    doc.text(510, 66, result['remaining_address']);
                                }
                                if (result['phone'] !== undefined){
                                    doc.text(510, 84, 'Tel: ' + result['phone']);
                                }
                                if (result['email'] !== undefined){
                                    doc.text(510, 102, result['email']);
                                }
                                // Line
                                doc.setLineWidth(1.5); // #a24689
                                doc.setDrawColor(162, 70, 137);
                                doc.line(30, 110, pageSize.width - 30, 110);
                                doc.setFontSize(16);
                                // Message
                                var message = $('#hero-demo').val()
                                var xOffset = (pageSize.width / 2) -
                                    (doc.getStringUnitWidth(message) * doc.internal.getFontSize() / 2);
                                doc.text(xOffset, 130, message);
                                // FOOTER
                                var totalPagesExp = "{total_pages_count_string}";
                                var str = "Page " + data.pageCount;
                                if (typeof doc.putTotalPages === 'function') {
                                    str = str
                                }
                                doc.line(30, pageSize.height - 45, pageSize.width - 30, pageSize.height - 45);
                                doc.setFontSize(13);
                                doc.text(str, 745, pageSize.height - 32);
                                if (result['vat'] !== undefined){
                                    doc.text('Vat/GSTIN : ' + result['vat'], 30, pageSize.height - 32);
                                }
                                if (result['website'] !== undefined){
                                    doc.text(result['website'], 30, pageSize.height - 15);
                                }
                                doc.text('', 510, pageSize.height - 32);
                                doc.text('', 510, pageSize.height - 13);
                            };
                        }
                        var options = {
                            beforePageContent: header,
                            startY: doc.previousAutoTable.finalY,
                            margin: {
                              top: 65,
                              bottom: 65,
                            },
                        };
                        doc.setFontSize(10);
                        // Calculating First column width
                        var first_column_width = 175
                        if (header_list.length > 9){
                            first_column_width = 95
                        }
                        else if (header_list.length > 8){
                            first_column_width = 120
                        }
                        // Printing Table
                        doc.autoTable({
                            head: header_list,
                            body: answer_list,
                            theme:'grid',
                            styles: {
                                // overflow: 'linebreak',
                                // columnWidth: 'wrap',
                                cellWidth: 'auto',
                                minCellWidth: 45
                            },
                            columnStyles: {
                                0: {
                                    cellWidth: first_column_width
                                },
                            },
                            startY: 140,
                            margin: {
                                top: 140,
                                left: 30,
                                right: 30,
                            },
                           overflowColumns: false
                        });
                        doc.save('Pivot_View.pdf')
                        window.location.reload();

                    });
    },

    });
    // override CalendarView

    CalendarView.include({
        render_buttons: function() {
            var result = this._super.apply(this, arguments); // Sets if (this.$buttons) {
            var self = this;
            if (this.$buttons) {
                    this.$buttons.on('click', '#create_pdf', function (e) {
                        e.preventDefault();
                        self.generate_pdf();

                    });
                    }

        },
         generate_pdf: function() {
         var a4 = [800, 841.89];
         var form = $('.o_view_manager_content');
         var cache_width = form.width();
        html2canvas($('.o_view_manager_content'), {
        useCORS: true,
        onrendered: function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                         unit: 'px',
                         format: 'letter',
                         orientation: 'landscape'
                     });
                    var title = $('ol.breadcrumb').find('li.active').html();
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setTextColor(0,0,255);
                    doc.text(title, 20, 30);
                    doc.addImage(imgData, 'JPEG', 20, 60, 500, 220);
                    doc.save('list.pdf');
                    form.width(cache_width);
        }
    });

                  //  html2canvas($('.o_form_view'), {


        },

    });


});