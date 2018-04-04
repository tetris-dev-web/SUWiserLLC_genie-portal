json.extract! project,  :id,
                        :title,
                        :cost,
                        :valuation,
                        :video,
                        :icon,
                        :description,
                        :creator_id,
                        :creator

json.file asset_path(project.file.url)
