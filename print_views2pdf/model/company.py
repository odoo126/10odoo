
from odoo import fields, models, api, _


class ResCompany(models.Model):
    _inherit = "res.company"

    format_type = fields.Selection([('A', 'A'), ('B', 'B'), ('C', 'C')], string='Format Type',
                                   help='Format to be used in Print View Report', default='A')

    @api.multi
    def all_company_data(self):
        company = self.env.user.company_id
        complete_street = company.street and company.street + ', ' or ''
        if company.street2:
            complete_street += company.street2
        remaining_address = company.zip or ''
        if company.city:
            remaining_address += ' ' + company.city
        if company.country_id:
            remaining_address += ' - ' + company.country_id.name
        dic = {
            'name': company.name or '',
            'street': company.street or '',
            'street2': company.street2 or '',
            'city': company.city or '',
            'state_id': company.state_id.name or '',
            'zip': company.zip or '',
            'country_id': company.country_id.name or '',
            'email': company.email or '',
            'phone': company.phone or '',
            'website': company.website or '',
            'logo': company.logo,
            'vat': company.vat,
            'format_type': company.format_type,
            'complete_street': complete_street or '',
            'remaining_address': remaining_address or '',
        }
        return dic






    @api.multi
    def all_data_export(self, model, model_data, ids_data, data):
        if data and ids_data and model_data:
            final_1 = []
            label_name = []
            data_fields = len(model_data)
            for rec in self.env[model].browse(ids_data):
                list_1 = []
                data = rec.read(model_data)
                for fie in range(0, data_fields):

                    # if data[0].get(model_data[fie]) and len(data[0].get(model_data[fie])) == 2:
                    #     list_1.append(data[0].get(model_data[fie])[1])
                    # else:
                    list_1.append(data[0].get(model_data[fie]))

                    print(self.env[model].fields_get(model_data[fie]))
                final_1.append(list_1)
            return final_1




